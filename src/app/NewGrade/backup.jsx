'use client'
import { Alert, Button, CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import BasicAppBar from "../../componentes/appbar.jsx";
import sample1 from "../../assets/Sample1.webp";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from 'next/image'
import React, { useState } from 'react'
import './NewGrade.css'
import { upload } from "../../actions/vimeosdk";
import UploadFile from "../../componentes/UploadFile.jsx";
import UploadImgs from '../../componentes/UploadImgs.jsx';
import CheckIcon from '@mui/icons-material/Check';
import { useEdgeStore } from '../libs/edgestore.ts';
import { useSession } from 'next-auth/react';

export default function Page() {

    const [image, setImage] = useState(null)
    const [ImageFile, setImageFile] = useState(null)
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


    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleCreate = async () => {
        setloading(true)
        if (!ImageFile || !videofile) return;

        try {
            // Upload image
            const imageRes = await edgestore.publicFiles.upload({ ImageFile });
            console.log(imageRes);
            seturlpic(imageRes.url);

            // Upload video
            const data = new FormData();
            data.append('file', videofile);
            data.append('name', name);
            data.append('desc', desc);
            data.append('price', price);
            data.append('slogan', slogan);
            data.append('urlpic', imageRes.url);
            data.append('token', session.user.token);

            const videoRes = await fetch('/api/upload', {
                method: 'POST',
                body: data
            });

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

                    <h2 style={{ color: "#7c3030", }}>Nuevo Curso</h2>

                    <div className='Data'>

                        <div className='smalldata'>
                            <div className='container'>

                                <div className='img-container' onChange={onImageChange}>
                                    {image && <img alt="preview image" className='img' src={image} />}
                                    <Button
                                        disabled={loading}
                                        component="label"
                                    >
                                        <AddAPhotoIcon sx={{ color: "#7c3030" }} />
                                        <input
                                            accept="image/png, image/jpeg, image/jpg"
                                            type="file"
                                            onChange={(e) => {
                                                setImageFile(e.target.files?.[0])
                                            }}
                                            hidden
                                        />
                                    </Button>
                                </div>
                                {/* <Typography style={{ color: "#7c3030", }}>Foto</Typography> */}
                            </div>

                            <TextField value={name} disabled={loading} onChange={(e) => { setname(e.target.value) }} color='#7c3030' id="outlined-basic" label="Nombre del curso" variant="outlined" />
                            <FormControl>
                                <InputLabel color='#7c3030' htmlFor="outlined-adornment-amount">Precio</InputLabel>
                                <OutlinedInput disabled={loading} value={price} onChange={(e) => { setprice(e.target.value) }} color='#7c3030' type='number'
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Precio"
                                />
                            </FormControl>
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
                            <TextField
                                value={slogan} onChange={(e) => { setslogan(e.target.value) }}
                                color='#7c3030'
                                id="outlined-multiline-flexible"
                                label="Eslogan"
                                disabled={loading}
                                multiline
                                minRows={5}
                                maxRows={5}
                            />
                        </div>

                    </div>
                    <Button
                        disabled={!ImageFile || !videofile || loading}
                        onClick={handleCreate}
                        sx={{ backgroundColor: "#7c3030" }}
                        variant="contained"
                    >
                        Crear
                    </Button>

                    {loading && <CircularProgress sx={{ position: "absolute", color: "#7c3030" }} />}
                    {showalert && <Alert sx={{ position: "absolute" }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Curso creado de manera correcta.
                    </Alert>}
                </div>
            </div>
        </>
    )
}