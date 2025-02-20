import React from 'react';
import './class.css';
import BasicAppBar from "../../componentes/appbar";
import sample9 from "../../assets/sample9.jpg";
import { Typography } from '@mui/material';

function Page(props) {
    return (
        <>
            <BasicAppBar></BasicAppBar>

            <div className='presentacion' style={{
                backgroundImage: `url(${sample9.src})`
            }}>
                <div className='TextoP'>
                    <h1 style={{color:"white"}}>The Minimalist Workout</h1>
                    <Typography style={{color:"white"}}>The Best Science-Based Minimalist Workout Plan (Under 45 Mins)</Typography>
                </div>
            </div>

            <div className='clase'>
                <div className='header'>
                    <div className='desc'>
                        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a repudiandae, minima voluptatibus explicabo ab culpa aliquid ut quisquam ipsam quam ex distinctio vero ad?</Typography>
                    </div>
                    <div className='date'>
                        05-29-2025
                    </div>
                </div>

                <div className='clase-body'>
                    <div className='iframe-container'>
                        <iframe src="https://player.vimeo.com/video/1057077360?h=350191acb3" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            <div className='clase'>
                <div className='header'>
                    <div className='desc'>
                        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a repudiandae, minima voluptatibus explicabo ab culpa aliquid ut quisquam ipsam quam ex distinctio vero ad?</Typography>
                    </div>
                    <div className='date'>
                        05-29-2025
                    </div>
                </div>

                <div className='clase-body'>
                    <div className='iframe-container'>
                        <iframe src="https://player.vimeo.com/video/1057077360?h=350191acb3" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                    </div>
                </div>
            </div>


            <div className='clase'>
                <div className='header'>
                    <div className='desc'>
                        <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum a repudiandae, minima voluptatibus explicabo ab culpa aliquid ut quisquam ipsam quam ex distinctio vero ad?</Typography>
                    </div>
                    <div className='date'>
                        05-29-2025
                    </div>
                </div>

                <div className='clase-body'>
                    <div className='iframe-container'>
                        <iframe src="https://player.vimeo.com/video/1057077360?h=350191acb3" frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                    </div>
                </div>
            </div>

            <div style={{height:"50px"}}></div>
        </>
    );
}

export default Page;