'use client'
import { Alert, Button, CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from '@mui/material'
import BasicAppBar from "../../componentes/appbar.jsx";
import sample1 from "../../assets/Sample1.webp";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from 'next/image'
import React, { useState, Suspense } from 'react'
import './EditGrade.css'
import { upload } from "../../actions/vimeosdk";
import UploadFile from "../../componentes/UploadFile.jsx";
import UploadImgs from '../../componentes/UploadImgs.jsx';
import CheckIcon from '@mui/icons-material/Check';
import { useEdgeStore } from '../libs/edgestore.ts';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';

function EditGradePage() {
    const [image, setImage] = useState(null)
    const [file, setFile] = useState(null)
    const { edgestore } = useEdgeStore();
    const [name, setname] = useState('')
    const [desc, setdesc] = useState('')
    const [price, setprice] = useState('')
    const [slogan, setslogan] = useState('')
    const [urlpic, seturlpic] = useState('')
    const [vidid, setvidid] = useState("")
    const [videofile, setvideoFile] = useState()
    const [loading, setloading] = useState(false)
    const [showalert, setshowalert] = useState(false)
    const { data: session, status } = useSession();
    const [data, setData] = React.useState([])

    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleCreate = async () => {
        setloading(true)
        if (!file && !videofile) {
            const config = {
                headers: { Authorization: `Bearer ${session.user.token}` }
            };

            const requestData = {
                name: name,
                desc: desc,
                slogan: slogan,
                price: Number(price),
            };

            const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateGrade/${id}`, requestData, config);
            setloading(false)
        } else {
            if (file && !videofile) {
                const imageRes = await edgestore.publicFiles.upload({ file });
                console.log(imageRes);

                const config = {
                    headers: { Authorization: `Bearer ${session.user.token}` }
                };

                const requestData = {
                    name: name,
                    desc: desc,
                    slogan: slogan,
                    price: Number(price),
                    url_pic: imageRes.url
                };

                const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateGrade/${id}`, requestData, config);
                setloading(false)
            } else {
                if (!file && videofile) {
                    try {
                        // Upload video
                        const data = new FormData();
                        data.append('id', vidid);
                        data.append('file', videofile);
                        data.append('name', name);
                        data.append('desc', desc);
                        data.append('price', price);
                        data.append('slogan', slogan);
                        data.append('token', session.user.token);

                        const videoRes = await fetch('/api/upload-edit', {
                            method: 'POST',
                            body: data
                        });

                        if (!videoRes.ok) throw new Error(await videoRes.text());

                        console.log('Video uploaded successfully');
                        const config = {
                            headers: { Authorization: `Bearer ${session.user.token}` }
                        };

                        const requestData = {
                            name: name,
                            desc: desc,
                            slogan: slogan,
                            price: Number(price),
                        };

                        const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateGrade/${id}`, requestData, config);
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
                } else {
                    if (file && videofile) {
                        try {
                            // Upload image
                            const imageRes = await edgestore.publicFiles.upload({ file });
                            console.log(imageRes);
                            seturlpic(imageRes.url);

                            // Upload video
                            const data = new FormData();
                            data.append('id', vidid);
                            data.append('file', videofile);
                            data.append('name', name);
                            data.append('desc', desc);
                            data.append('price', price);
                            data.append('slogan', slogan);
                            data.append('urlpic', imageRes.url);
                            data.append('token', session.user.token);

                            const videoRes = await fetch('/api/upload-edit', {
                                method: 'POST',
                                body: data
                            });

                            if (!videoRes.ok) throw new Error(await videoRes.text());

                            console.log('Video uploaded successfully');

                            const config = {
                                headers: { Authorization: `Bearer ${session.user.token}` }
                            };

                            const requestData = {
                                name: name,
                                desc: desc,
                                slogan: slogan,
                                price: Number(price),
                                url_pic: imageRes.url
                            };

                            const res = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateGrade/${id}`, requestData, config);
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
                    }
                }
            }
        }
    };

    // Function to run when the page starts
    const initializePage = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/grades/${id}`)
            .then(function (response) {
                // handle success
                console.log(response.data);
                setData(response.data)
                setname(response.data.name)
                setprice(response.data.price)
                setdesc(response.data.desc)
                setslogan(response.data.slogan)
                setImage(response.data.url_pic)
                setvidid(response.data.vidId)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    };

    React.useEffect(() => {
        initializePage();
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            {loading && <div style={{ position: "absolute", backgroundColor: "rgba(0, 0, 0, 0.3)", width: "100%", height: "100%" }}></div>}
            <BasicAppBar></BasicAppBar>
            <div className='background' style={{
                backgroundImage: `url(${sample1.src})`
            }}>
                <div className='form' >
                    <h2 style={{ color: "#7c3030", }}>Editar Curso</h2>
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
                                                setFile(e.target.files?.[0])
                                            }}
                                            hidden
                                        />
                                    </Button>
                                </div>
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
                        disabled={loading}
                        onClick={handleCreate}
                        sx={{ backgroundColor: "#7c3030" }}
                        variant="contained"
                    >
                        Editar Informacion
                    </Button>
                    {loading && <CircularProgress sx={{ position: "absolute", color: "#7c3030" }} />}
                    {showalert && <Alert sx={{ position: "absolute" }} icon={<CheckIcon fontSize="inherit" />} severity="success">
                        Curso creado de manera correcta.
                    </Alert>}
                </div>
            </div>
        </Suspense>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditGradePage />
        </Suspense>
    );
}