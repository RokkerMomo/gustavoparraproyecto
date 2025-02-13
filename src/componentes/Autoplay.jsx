import React from "react";
import Slider from "react-slick";
import sample6 from "../assets/sample6.webp";
import sample7 from "../assets/sample7.jpg";
import sample8 from "../assets/sample8.webp";
import sample9 from "../assets/sample9.jpg";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";
import Image from 'next/image'
import "./Autoplay.css";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import axios from 'axios';
function AutoPlay() {


  const [numbers, setnumbers] = useState([]);

   // Function to run when the page starts
   const initializePage = () => {
    axios.get('http://localhost:5173/grades')
        .then(function (response) {
            // handle success
            console.log(response.data);
            setnumbers(response.data);
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
    initializePage();
}, []);


  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: true
  };

  // const numbers = [
  //   { img: sample6 }, { img: sample7 }, { img: sample8 }, { img: sample6 }, { img: sample7 }, { img: sample8 }
  // ]

  return (
    <div>
      <Slider {...settings}>

        <div>

          <div className="Container">

            <div className="Img-Container">
              <Image className="Img" alt="placeholder" src={sample9} />
            </div>

            <div className="Footer">
            <Link href="/grade" style={{ fontWeight: "bold", color: "white" }}>
              <Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
              <p style={{ fontWeight: "bold", color: "white" }}>Informacion</p>
              </Button>
              </Link>
              <Button onClick={()=>{console.log(numbers[1])}} variant="h6" component="div" sx={{ width: 125, height: 40 }} >
                <p style={{ fontWeight: "bold", color: "white" }}>Compra Ya</p>
              </Button>

            </div>

          </div>
        </div>

        {numbers&&numbers.map((number, i) =>
          <div key={i}>

            <div className="Container">

              <div className="Img-Container">
                <Image className="Img" alt="placeholder" fill={true} src={number.url_pic} />
              </div>

              <div className="Footer">

              <Link href={{pathname:"/grade",query:{id:number._id}}} style={{ fontWeight: "bold", color: "white" }}>
              <Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
              <p style={{ fontWeight: "bold", color: "white" }}>Informacion</p>
              </Button>
              </Link>

                <Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
                  <p style={{ fontWeight: "bold", color: "white" }}>Compra Ya</p>
                </Button>

              </div>

            </div>
          </div>
        )}


      </Slider>
    </div>
  );
}

export default AutoPlay;
