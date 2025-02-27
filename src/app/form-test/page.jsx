'use client';
import { Button } from '@mui/material';
import React, { useState } from 'react';

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploadId, setUploadId] = useState('');
  const [progress, setProgress] = useState(0);

  // Manejo del input tipo "file"
  function handleFileChange(e) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  // Opcional: pedir un uploadId único al backend (ej. "init")
  async function handleInit() {
    try {
      const res = await fetch('/api/upload-chunk?action=init', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.uploadId) {
        setUploadId(data.uploadId);
      }
    } catch (err) {
      console.error('Error en init:', err);
    }
  }

  // Subir en chunks
  async function handleUploadChunks() {
    if (!file) return;
    if (!uploadId) {
      console.error('No tienes uploadId. Llama primero a handleInit().');
      return;
    }

    // 2MB por chunk
    const chunkSize = 2 * 1024 * 1024; 
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('chunkIndex', i);
      formData.append('totalChunks', totalChunks);
      formData.append('fileName', file.name);

      try {
        // Subimos cada chunk al endpoint
        const res = await fetch(`/api/upload-chunk?action=upload&uploadId=${uploadId}`, {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || 'Error al subir chunk');
        }
      } catch (err) {
        console.error('Error subiendo chunk:', i, err);
        return;
      }

      // Actualizar progreso
      const percent = Math.round(((i + 1) / totalChunks) * 100);
      setProgress(percent);
    }

    console.log('Todos los chunks subidos');
  }

  // Llamar a "finish" para recombinar
  async function handleFinish() {
    if (!uploadId) return;
    try {
      const formData = new FormData();
      formData.append('fileName', file.name);

      const res = await fetch(`/api/upload-chunk?action=finish&uploadId=${uploadId}`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error en finish');
      }
      console.log('Archivo recombinado con éxito:', data);
      alert('Recombinación lista. Archivo final: ' + data.finalFilePath);
      setProgress(0);
      setUploadId('');
      setFile(null);
    } catch (err) {
      console.error('Error en finish:', err);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Subir archivo en chunks de 2MB</h2>
      <input type="file" onChange={handleFileChange} />
      <div style={{ margin: '10px 0' }}>
        <Button type="button" onClick={handleInit} disabled={!file}>
          1) Iniciar (crear uploadId)
        </Button>
        <Button type="button" onClick={handleUploadChunks} disabled={!file || !uploadId}>
          2) Subir chunks
        </Button>
        <Button type="button" onClick={handleFinish} disabled={!uploadId}>
          3) Finalizar (recombinar)
        </Button>
      </div>
      {progress > 0 && <p>Progreso: {progress}%</p>}
      {uploadId && <p>UploadId: {uploadId}</p>}
    </div>
  );
}
