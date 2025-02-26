'use client'
import React, { useEffect, useState, Suspense } from 'react';
import './class.css';
import BasicAppBar from "../../componentes/appbar";
import sample9 from "../../assets/sample9.jpg";
import { Button, Fab, Typography } from '@mui/material';
import { useSession, signOut } from "next-auth/react";
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { deleteVideo } from "../../actions/vimeosdk";
import axios from 'axios';

function ClassPage() {
    const { data: session, status } = useSession();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const url1 = "https://player.vimeo.com/video/";

    const [classes, setClasses] = useState([]);
    const [data, setData] = React.useState([])

    const initializePage = () => {
        if (!session || !session.user || !session.user.token) {
            console.error('Session is not defined or user token is missing');
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${session.user.token}` }
        };

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/grades/${id}`)
            .then(function (response) {
                // handle success
                console.log(response.data);
                setData(response.data)
                console.log(response.data.vidId);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getClassesByGrade/${id}`, config)
            .then(function (response) {
                // handle success
                console.log(response.data);
                setClasses(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    };

    useEffect(() => {
        if (status === "authenticated") {
            initializePage();
        }
    }, [status]);

    const formatDate = (dateString) => {
        const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options).replace(/\//g, '-');
    };

    const handleDelete = async (vidid, id) => {
        try {
            const res = await deleteVideo(vidid);
            console.log(res);
            console.log("video borrado con exito");

            const config = {
                headers: { Authorization: `Bearer ${session.user.token}` }
            };

            console.log(session.user.token)
            const axiosres = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteClass/${id}`, config);
            console.log(axiosres.data);

            window.location.reload();
        } catch (error) {
            console.error('Failed to delete grade:', error);
        }
    };

    return (
        <>
            <BasicAppBar></BasicAppBar>

            <div className='presentacion' style={{
                backgroundImage: `url(${data.url_pic})`
            }}>
                <div className='TextoP'>
                    <h1 style={{ color: "white" }}>{data.name}</h1>
                    <Typography style={{ color: "white" }}>{data.slogan}</Typography>
                </div>

                <div className='footerP'>
                    {
                        session?.user.role == "admin" && <Link style={{ marginLeft: "auto" }} href={{ pathname: "/test", query: { id: id } }}><Fab sx={{ marginLeft: "auto", backgroundColor: "#7c3030" }} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab></Link>
                    }
                </div>

            </div>

            {classes && classes.map((classItem) => (
                <div key={classItem._id} className='clase'>
                    <div className='header'>
                        <div className='desc'>
                            <Typography>{classItem.desc}</Typography>
                        </div>
                        <div className='date'>
                            {formatDate(classItem.date)}
                        </div>
                        {
                            session?.user.role == "admin" && <Button onClick={() => {
                                handleDelete(classItem.url_vid, classItem._id)
                            }} sx={{ backgroundColor: "#7c3030" }}>
                                <DeleteForeverIcon sx={{ color: "white" }}></DeleteForeverIcon>
                            </Button>
                        }
                    </div>

                    <div className='clase-body'>
                        <div className='iframe-container'>
                            <iframe title="vimeo-player" src={`${url1}${classItem.url_vid}`} frameBorder="0" allow="autoplay; fullscreen" allowFullScreen></iframe>
                        </div>
                    </div>
                </div>
            ))}

            <div style={{ height: "50px" }}></div>
        </>
    );
}

export default function Page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClassPage />
        </Suspense>
    );
}