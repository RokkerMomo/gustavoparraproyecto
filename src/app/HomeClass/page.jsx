'use client'
import React, { useEffect, useState } from 'react';
import BasicAppBar from "../../componentes/appbar";
import sample9 from "../../assets/sample9.jpg";
import sample1 from "../../assets/sample3.jpg";
import "./HomeClass.css"
import { Button, Typography } from '@mui/material';
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react";
import axios from 'axios';

function Page(props) {
    const { data: session, status } = useSession();
    const [grades, setGrades] = useState([]);

    const initializePage = () => {
        if (!session || !session.user || !session.user.token) {
            console.error('Session is not defined or user token is missing');
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${session.user.token}` }
        };

        axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserGrades/${session.user.id}`, config)
            .then(function (response) {
                // handle success
                console.log(response.data);
                setGrades(response.data);
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

    return (
        <>
            <BasicAppBar></BasicAppBar>
            <div className='MainCointainer' style={{
                backgroundImage: `url(${sample1.src})`
            }}>
                <div className='test'></div>

                <h2 style={{ fontWeight: "bold", color: "white", backgroundColor: "rgba(0, 0, 0, 0.1)" }}>Tus Clases</h2>

                <div className='class-Container'>
                    {grades.map((grade) => (
                        <div className='class' key={grade._id}>
                            <div className='img-containerS'>
                                <img className='img-class' src={grade.url_pic} alt="sample" />
                            </div>
                            <div className='class-body'>
                                <Typography>{grade.name}</Typography>
                            </div>
                            <Link href={{pathname:"/class",query:{id:grade._id}}}><Button sx={{ backgroundColor: "#7c3030", color: "white", margin: "0.5rem", width: "95%" }}>Ver Clases</Button></Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Page;