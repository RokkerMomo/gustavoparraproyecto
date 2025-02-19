"use client"
import React from 'react';
import BasicAppBar from "../../componentes/appbar";
import DataTableS from "../../componentes/DataTableS";
import sample1 from "../../assets/Sample1.webp";
import "./ManageStudents.css"
import { Button, TextField } from '@mui/material';
import Link from 'next/link'
function page(props) {
    return (
        <>
            <BasicAppBar></BasicAppBar>
            <div className='background' style={{
                backgroundImage: `url(${sample1.src})`
            }}>
                <div className='table-container'>
                    <div className='Botones'>
                        <TextField id="outlined-basic" label="Buscar" variant="outlined" />
                        <Link href="/NewStudent" style={{ color: "white", marginLeft: "auto" }}>
                            <Button style={{ backgroundColor: "#7c3030", color: "white", height: "100%" }}>Alumno Nuevo</Button>
                        </Link>

                    </div>
                    <DataTableS></DataTableS>
                </div>
            </div>
        </>
    );
}

export default page;