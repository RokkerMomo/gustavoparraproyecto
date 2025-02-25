'use client'
import React, { Suspense } from 'react';
import Image from 'next/image'
import BasicAppBar from "../../componentes/appbar.jsx";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import VideocamIcon from '@mui/icons-material/Videocam';
import sample9 from "../../assets/sample9.jpg";
import "./grade.css";
import { Button, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation'
import axios from 'axios';

function GradePage() {
    const [data, setData] = React.useState([])
    const [url3, setUrl3] = React.useState("")
    const url1 = "https://player.vimeo.com/video/";

    const searchParams = useSearchParams()
    const id = searchParams.get('id')

    // Function to run when the page starts
    const initializePage = () => {
        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/grades/${id}`)
            .then(function (response) {
                // handle success
                console.log(response.data);
                setData(response.data)
                console.log(response.data.vidId);
                const videoUrl = `${url1}${response.data.vidId}&title=0&byline=0&portrait=0&controls=1&autoplay=1&dnt=1`;
                setUrl3(videoUrl);
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
        <>
            {/* NAVBAR */}
            <BasicAppBar></BasicAppBar>
            {/* IMAGEN */}
            <img className='Img' alt='HomeImg' style={{ height: 600 }} src={data.url_pic} />
            <div className='Blackbox'>
                <h2 style={{ fontWeight: "bold", color: "white" }}>{data.slogan}</h2>
            </div>

            <div className='information'>
                {url3 && <iframe title="vimeo-player" src={url3} width="854" height="480" allowFullScreen></iframe>}
                <div className='sidepannel'>
                    <h2 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>{data.price} USD</h2>
                    <Button sx={{ backgroundColor: "#50C878" }} variant="contained" size='large'>Mandar Whatsapp</Button>
                    <Button sx={{ backgroundColor: "#EC5800" }} disabled variant="contained" size='large'>Comprar Curso</Button>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: 20, gap: 10 }}>
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <PersonIcon fontSize='small'></PersonIcon><Typography style={{ marginLeft: 5 }}>{data.students} alumnos</Typography>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <ComputerIcon fontSize='small'></ComputerIcon><Typography style={{ marginLeft: 5 }}>Online y a tu ritmo</Typography>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <VideocamIcon fontSize='small'></VideocamIcon><Typography style={{ marginLeft: 5 }}>{data.classes} Clases grabadas</Typography>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <InsertEmoticonIcon fontSize='small'></InsertEmoticonIcon><Typography style={{ marginLeft: 5 }}>100% comprensión garantizada</Typography>
                        </div>
                    </div>
                </div>
            </div>

            <div className='Descripcion'>
                <h2>Descripción del curso</h2>
                {data.desc && data.desc.split('\n').map((line, index) => (
                   <Typography key={index} sx={{ textAlign: 'justify' }}>{line}</Typography>
                ))}
            </div>
        </>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GradePage />
        </Suspense>
    );
}