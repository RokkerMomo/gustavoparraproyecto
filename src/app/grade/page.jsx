import React from 'react';
import Image from 'next/image'
import BasicAppBar from "../../componentes/appbar.jsx";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PersonIcon from '@mui/icons-material/Person';
import ComputerIcon from '@mui/icons-material/Computer';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import sample9 from "../../assets/sample9.jpg";
import "./grade.css";
import { Button, Typography } from '@mui/material';
function page(props) {
    return (
        <>
            {/* NAVBAR */}
            <BasicAppBar></BasicAppBar>
            {/* IMAGEN */}
            <Image className='Img' alt='HomeImg' style={{ height: 600 }} src={sample9} />
            <div className='Blackbox'>
                <h2 style={{ fontWeight: "bold", color: "white" }}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt modi earum rem labore tempore consequatur architecto atque soluta excepturi velit.</h2>
            </div>

            <div className='information'>
                <iframe title="vimeo-player" src="https://player.vimeo.com/video/1055248773?h=f9b8340abf" width="854" height="480" allowFullScreen></iframe>
                <div className='sidepannel'>
                    <h2 style={{ fontWeight: "bold", fontFamily: "sans-serif" }}>99 USD</h2>
                    <Button sx={{ backgroundColor: "#50C878" }} variant="contained" size='large'>Mandar Whatsapp</Button>
                    <Button sx={{ backgroundColor: "#EC5800" }} disabled variant="contained" size='large'>Comprar Curso</Button>
                    <div style={{ display: "flex", flexDirection: "column", marginTop: 20, gap: 10 }}>


                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <PersonIcon fontSize='small'></PersonIcon><Typography style={{ marginLeft: 5 }}>500 alumnos</Typography>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <ComputerIcon fontSize='small'></ComputerIcon><Typography style={{ marginLeft: 5 }}>Online y a tu ritmo</Typography>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <ThumbUpIcon fontSize='small'></ThumbUpIcon><Typography style={{ marginLeft: 5 }}>98.55% Valoraciones positivas (356)</Typography>
                        </div>


                        <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                            <InsertEmoticonIcon fontSize='small'></InsertEmoticonIcon><Typography style={{ marginLeft: 5 }}>100% comprensión garantizada</Typography>
                        </div>

                    </div>

                </div>
            </div>

            <div className='Descripcion'>
                <h2>Descripción del curso</h2>
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore tempora possimus consequuntur iste cumque sequi neque asperiores quod, repellendus suscipit laudantium? Corporis voluptates animi sequi! Nostrum harum beatae aut possimus labore corporis autem suscipit hic modi, repellendus alias minus sapiente fuga aperiam molestias amet debitis porro nemo exercitationem. Placeat, ipsa.
                </Typography>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error soluta magnam nemo mollitia, ex sequi odio omnis accusantium vero, ducimus, quaerat vitae ea deserunt. Et, dolore dolor eligendi, aspernatur corrupti a earum aliquam optio, temporibus deleniti placeat inventore aliquid magnam debitis minus numquam voluptatibus illum. Facilis vel corporis deserunt nam.
                </Typography>
                <Typography>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor reprehenderit quas molestiae quidem eos nesciunt delectus facilis tempora magni corrupti ipsa, error voluptas suscipit ex alias facere, non earum natus!
                </Typography>
            </div>
        </>
    );
}

export default page;