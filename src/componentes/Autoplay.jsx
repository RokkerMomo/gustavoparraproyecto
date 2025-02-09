import React from "react";
import Slider from "react-slick";
import sample6 from "../assets/sample6.webp";
import sample7 from "../assets/sample7.jpg";
import sample8 from "../assets/sample8.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";  
import { Button } from "@mui/material";
import Image from 'next/image'
import "./Autoplay.css";
function AutoPlay() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: false,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows:true
  };

  const numbers= [
    {img:sample6},{img:sample7},{img:sample8},{img:sample6},{img:sample7},{img:sample8}
  ]

  return (
    <div>
      <Slider {...settings}>

      {numbers.map((number, i) =>
        <div key={i}>

        <div className="Container">

         <div className="Img-Container">
          <Image className="Img" alt="placeholder" src={number.img} />
         </div>

         <div className="Footer">

           <Button variant="h6" component="div" sx={{width:125, height:40}} >
                       <p style={{fontWeight:"bold",color:"white"}}>Informacion</p>
                     </Button>

                     <Button variant="h6" component="div" sx={{width:125, height:40}} >
                       <p style={{fontWeight:"bold",color:"white"}}>Compra Ya</p>
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
