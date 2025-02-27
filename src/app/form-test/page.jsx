'use client';
import { Alert, Button, CircularProgress, TextField, Typography } from '@mui/material'
import BasicAppBar from "../../componentes/appbar.jsx";
import sample1 from "../../assets/Sample1.webp";
import React, { useState, Suspense } from 'react'
import './NewClass.css'
import { PrepareVideotoUpload, upload } from "../../actions/vimeosdk";
import CheckIcon from '@mui/icons-material/Check';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'





function NewClassPage() {

  const [desc, setdesc] = useState('')
  const [loading, setloading] = useState(false)
  const [showalert, setshowalert] = useState(false)
  const { data: session, status } = useSession();
  const searchParams = useSearchParams()
  const id = searchParams.get('id')


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

    setloading(true)
    if (!file) return;

    try {
      const res = await fetch('/api/upload-chunk?action=init', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.uploadId) {
        setUploadId(data.uploadId);
        await handleUploadChunks(data.uploadId);
      }
    } catch (err) {
      console.error('Error en init:', err);
    }
  }

  // Subir en chunks
  async function handleUploadChunks(id) {
    if (!file) return;
    if (!id) {
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
        const res = await fetch(`/api/upload-chunk?action=upload&uploadId=${id}`, {
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
    await handleFinish(id);
  }

  // Llamar a "finish" para recombinar
  async function handleFinish(idfile) {
    if (!idfile) return;
    try {

      const newDate = new Date();
      const formattedDate = newDate.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-');
      const formData = new FormData();
      formData.append('fileName', file.name);
      formData.append('id_grade', id)
      formData.append('desc', desc);
      formData.append('token', session.user.token);
      formData.append('date', formattedDate)

      const res = await fetch(`/api/upload-chunk?action=finish&uploadId=${idfile}`, {
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

      setloading(false)
      setshowalert(true)
      setTimeout(
        () => {
          setshowalert(false);
        }
        , 5000)

    } catch (err) {
      console.error('Error en finish:', err);
      setloading(false)
    }
  }

  // Nueva función para manejar todas las etapas
  async function handleUploadAll() {
    try {
      await handleInit();
      // await handleUploadChunks();
      // await handleFinish();
    } catch (err) {
      console.error('Error en handleUploadAll:', err);
    }
  }

  return (
    <>
      {loading && <div style={{ position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.3)", width: "100%", height: "100%" }}></div>}
      <BasicAppBar></BasicAppBar>
      <div className='background' style={{
        backgroundImage: `url(${sample1.src})`
      }}>
        <div className='form' >

          <h2 style={{ color: "#7c3030", }}>Nueva Clase</h2>

          <div className='Data'>

            <div className='smalldata'>

              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "5px", minHeight: "75px", maxHeight: "75px", overflow: "hidden", textOverflow: "ellipsis" }}>
                <Button
                  variant="contained"
                  component="label"
                  disabled={loading}
                  sx={{ backgroundColor: "#7c3030", minHeight: "75px", maxHeight: "75px" }}
                >
                  Subir Video
                  <input
                    accept="video/mp4, video/webm, video/ogg"
                    type="file"
                    name="file"
                    hidden
                    onChange={handleFileChange}
                  />
                </Button>
                {file && <Typography>{file.name}</Typography>}
              </div>
            </div>

            <div className='smalldata'>
              <TextField
                value={desc} onChange={(e) => { setdesc(e.target.value) }}
                color='#7c3030'
                id="outlined-multiline-flexible"
                label="Descripción"
                disabled={loading}
                multiline
                minRows={8}
                maxRows={8}
              />
            </div>

          </div>
          <Button
            disabled={!file || loading}
            onClick={handleUploadAll}
            sx={{ backgroundColor: "#7c3030" }}
            variant="contained"
          >
            Crear
          </Button>

          {loading && <CircularProgress sx={{ position: "absolute", color: "#7c3030" }} />}
          {showalert && <Alert sx={{ position: "absolute" }} icon={<CheckIcon fontSize="inherit" />} severity="success">
            Clase Creada de manera correcta.
          </Alert>}
        </div>
      </div>
    </>
  )
}






export default function UploadPage() {
  return (


    <Suspense fallback={<div>Loading...</div>}>
      <NewClassPage />
    </Suspense>

    // <div style={{ padding: 20 }}>
    //   <h2>Subir archivo en chunks de 2MB</h2>
    //   <input type="file" onChange={handleFileChange} />
    //   <div style={{ margin: '10px 0' }}>
    //     <Button type="button" onClick={handleUploadAll} disabled={!file}>
    //       Subir y Recombinación Completa
    //     </Button>
    //   </div>
    //   {progress > 0 && <p>Progreso: {progress}%</p>}
    //   {uploadId && <p>UploadId: {uploadId}</p>}
    // </div>
  );
}