import React from 'react';
import BasicAppBar from "../../componentes/appbar";
import sample9 from "../../assets/sample9.jpg";
import sample1 from "../../assets/sample3.jpg";
import "./HomeClass.css"
import { Button, Typography } from '@mui/material';
import Link from 'next/link'

function page(props) {
    return (
        <>
            <BasicAppBar></BasicAppBar>
            <div className='MainCointainer' style={{
                    backgroundImage: `url(${sample1.src})`
                }}>
                <div className='test'></div>

                <h2 style={{ fontWeight: "bold", color: "white",backgroundColor:"rgba(0, 0, 0, 0.1)" }}>Tus Clases</h2>

                <div className='class-Container' >


                    <div className='class'>
                        <div className='img-container'>
                            <img className='img' src={sample9.src} alt="sample" />
                        </div>
                        <div className='class-body'>
                            <Typography>The Best Science-Based Minimalist Workout Plan (Under 45 Mins)</Typography>
                        </div>
                        <Link href="/class"><Button sx={{ backgroundColor: "#7c3030", color: "white", margin: "0.5rem",width:"95%"}}>Ver Clases</Button></Link>
                        
                    </div>

                    <div className='class'>
                        <div className='img-container'>
                            <img className='img' src={sample9.src} alt="sample" />
                        </div>
                        <div className='class-body'>
                            <Typography>The Best Science-Based Minimalist Workout Plan (Under 45 Mins)</Typography>
                        </div>
                        <Button sx={{ backgroundColor: "#7c3030", color: "white", margin: "0.5rem" }}>Ver Clases</Button>
                    </div>


                    <div className='class'>
                        <div className='img-container'>
                            <img className='img' src={sample9.src} alt="sample" />
                        </div>
                        <div className='class-body'>
                            <Typography>The Best Science-Based Minimalist Workout Plan (Under 45 Mins)</Typography>
                        </div>
                        <Button sx={{ backgroundColor: "#7c3030", color: "white", margin: "0.5rem" }}>Ver Clases</Button>
                    </div>


                    <div className='class'>
                        <div className='img-container'>
                            <img className='img' src={sample9.src} alt="sample" />
                        </div>
                        <div className='class-body'>
                            <Typography>The Best Science-Based Minimalist Workout Plan (Under 45 Mins)</Typography>
                        </div>
                        <Button 
                        sx={{ backgroundColor: "#7c3030", color: "white", margin: "0.5rem" }}
                        >Ver Clases</Button>
                    </div>


                    


                </div>



            </div>
        </>
    );
}

export default page;