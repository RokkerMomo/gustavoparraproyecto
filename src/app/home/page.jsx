'use client'
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';
import BasicAppBar from "../../componentes/appbar.jsx";
import sample2 from "../../assets/sample2.jpg";
import SimpleColapse from "../../componentes/SimpleColapse.jsx";
import AutoPlay from "../../componentes/Autoplay.jsx";
import "./Home.css";
import Image from 'next/image'




function Home(props) {



    return (
        <>
            {/* <meta name="viewport" content={width} /> */}
            {/* NAVBAR */}
            <BasicAppBar></BasicAppBar>

            {/* IMAGEN */}
            <Image className='Img' alt='HomeImg' style={{ height: 500 }} src={sample2} />


            {/* Carrousel */}
            <div className='Carrousel'>
                <h2 style={{ fontWeight: "bold", color: "white" }}>Nuestros Cursos</h2>
                <AutoPlay></AutoPlay>
            </div>

            {/* About us */}
            <SimpleColapse></SimpleColapse>


            {/* Whitebox */}
            <div className="WhiteboxWithItems" >

                {/* Conect with us */}
                <h2>Conecta con nosotros</h2>
                <div>
                    <FacebookIcon fontSize='large' style={{ padding: "0.5rem" }}></FacebookIcon>
                    <InstagramIcon fontSize='large' style={{ padding: "0.5rem" }}></InstagramIcon>
                    <YouTubeIcon fontSize='large' style={{ padding: "0.5rem" }}></YouTubeIcon>

                </div>



            </div>
            <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
            </div>

        </>

    );
}

export default Home;