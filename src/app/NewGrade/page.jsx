'use client'
import { Button, FormControl, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import BasicAppBar from "../../componentes/appbar.jsx";
import sample1 from "../../assets/Sample1.webp";;
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Image from 'next/image'
import React, { useState } from 'react'
import './NewGrade.css'
export default function page() {

    const [image, setImage] = useState(null)

const onImageChange = (event) => {
 if (event.target.files && event.target.files[0]) {
   setImage(URL.createObjectURL(event.target.files[0]));
 }
}


    return (
        <>
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
                                {image&&<Image alt="preview image" fill={true} className='img' src={image} />}
                                    <Button
                                        component="label"
                                    >
                                        <AddAPhotoIcon sx={{color:"#7c3030"}} />
                                        <input
                                            type="file"
                                            hidden
                                        />
                                    </Button>
                                </div>
                            </div>

                            <TextField color='#7c3030' id="outlined-basic" label="Nombre del curso" variant="outlined" />
                            <FormControl>
                                <InputLabel color='#7c3030' htmlFor="outlined-adornment-amount">Precio</InputLabel>
                                <OutlinedInput color='#7c3030' type='number'
                                    id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
                                    label="Precio"
                                />
                            </FormControl>
                            <TextField color='#7c3030' id="outlined-basic" label="Nombre" variant="outlined" />
                        </div>

                        <div className='smalldata'>
                            <TextField
                                color='#7c3030'
                                id="outlined-multiline-flexible"
                                label="Descripción"
                                multiline
                                minRows={8}
                                maxRows={8}
                            />
                            <TextField
                                color='#7c3030'
                                id="outlined-multiline-flexible"
                                label="Eslogan"
                                multiline
                                minRows={5}
                                maxRows={5}
                            />
                        </div>

                    </div>
                    <Button sx={{ backgroundColor: "#7c3030" }} variant="contained">Crear</Button>
                </div>
            </div>
        </>
    )
}
