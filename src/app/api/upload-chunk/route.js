import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { upload } from '../../../actions/vimeosdk';

export async function POST(request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const uploadId = searchParams.get('uploadId');

    // A) init → devolver un uploadId
    if (action === 'init') {
      const newUploadId = uuidv4();
      return NextResponse.json({ uploadId: newUploadId });
    }

    // B) upload → guardar cada chunk en /tmp
    if (action === 'upload') {
      if (!uploadId) {
        return NextResponse.json({ error: 'Falta uploadId' }, { status: 400 });
      }

      const formData = await request.formData();
      const chunkBlob = formData.get('chunk');
      const chunkIndex = formData.get('chunkIndex');

      if (!chunkBlob || chunkIndex == null) {
        return NextResponse.json({ error: 'Faltan datos' }, { status: 400 });
      }

      // Convierte Blob a Buffer
      const arrayBuffer = await chunkBlob.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Guarda en /tmp con nombre <uploadId>-chunk-<chunkIndex>
      const filePath = path.join('/tmp', `${uploadId}-chunk-${chunkIndex}`);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({ success: true });
    }

    // C) finish → recombinar
    if (action === 'finish') {
      if (!uploadId) {
        return NextResponse.json({ error: 'Falta uploadId' }, { status: 400 });
      }

      const formData = await request.formData();
      const fileName = formData.get('fileName');

      // 1) Buscar los chunks
      const dir = fs.readdirSync('/tmp');
      const chunkFiles = dir
        .filter(f => f.startsWith(`${uploadId}-chunk-`))
        .sort((a, b) => {
          // Ordenar por el índice que va después de "chunk-"
          const idxA = parseInt(a.split('-chunk-')[1], 10);
          const idxB = parseInt(b.split('-chunk-')[1], 10);
          return idxA - idxB;
        });

      if (chunkFiles.length === 0) {
        return NextResponse.json({ error: 'No se encontraron chunks' }, { status: 400 });
      }

      // 2) Crear archivo final
      const finalFilePath = path.join('/tmp', `${uploadId}-final-${fileName}`);
      fs.writeFileSync(finalFilePath, ''); // empezar vacío

      // 3) Concatenar
      for (const chunkFile of chunkFiles) {
        const chunkPath = path.join('/tmp', chunkFile);
        const chunkData = fs.readFileSync(chunkPath);
        fs.appendFileSync(finalFilePath, chunkData);
      }

      // 4) (Opcional) Borrar chunks parciales
      for (const chunkFile of chunkFiles) {
        fs.unlinkSync(path.join('/tmp', chunkFile));
      }

      // Aquí podrías subir finalFilePath a tu servidor, S3, Vimeo, etc.
      // Por ahora, solo devolvemos la ruta final de /tmp

      await upload(finalFilePath, fileName, 'Descripción del video');
      return NextResponse.json({
        message: 'Recombinación exitosa',
        finalFilePath,
      });
    }

    return NextResponse.json({ error: 'Acción desconocida' }, { status: 400 });
  } catch (err) {
    console.error('Error en /api/upload-chunk:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
