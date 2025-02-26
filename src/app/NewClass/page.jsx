'use client'
import { Alert, Button, CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import BasicAppBar from "../../componentes/appbar.jsx";
import sample1 from "../../assets/Sample1.webp";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from 'next/image'
import React, { useState, Suspense } from 'react'
import './NewClass.css'
import { PrepareVideotoUpload, upload } from "../../actions/vimeosdk";
import UploadFile from "../../componentes/UploadFile.jsx";
import UploadImgs from '../../componentes/UploadImgs.jsx';
import CheckIcon from '@mui/icons-material/Check';
import { useEdgeStore } from '../libs/edgestore.ts';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'

function NewClassPage() {
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const { edgestore } = useEdgeStore();
    const [name, setname] = useState('')
    const [desc, setdesc] = useState('')
    const [price, setprice] = useState('')
    const [slogan, setslogan] = useState('')
    const [urlpic, seturlpic] = useState('')
    const [videofile, setvideoFile] = useState()
    const [loading, setloading] = useState(false)
    const [showalert, setshowalert] = useState(false)
    const { data: session, status } = useSession();
    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleCreate = async () => {
        const newDate = new Date();
        const formattedDate = newDate.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-');

        setloading(true)
        if (!videofile) return;

        try {

            // Upload video
            const data = new FormData();
            data.append('file', videofile);
            data.append('id_grade', id)
            data.append('desc', desc);
            data.append('token', session.user.token);
            data.append('date', formattedDate)

            // const videoRes = await fetch('/api/upload-class', {
            //     method: 'POST',
            //     body: data
            // });
            const videoRes = await PrepareVideotoUpload(
                videofile,id,desc,session.user.token,formattedDate
            )

            if (!videoRes.ok) throw new Error(await videoRes.text());

            console.log('Video uploaded successfully');
            setloading(false)
            setshowalert(true)
            setTimeout(
                () => {
                    setshowalert(false);
                }
                , 5000)
        } catch (e) {
            console.error(e);
            setloading(false)
        }
    };

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
                                        onChange={(e) => setvideoFile(e.target.files?.[0])}
                                    />
                                </Button>
                                {videofile && <Typography>{videofile.name}</Typography>}
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
                        disabled={!videofile || loading}
                        onClick={handleCreate}
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

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <NewClassPage />
        </Suspense>
    );
}