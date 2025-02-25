import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import sample5 from "../components/sample5.jpg";
import Image from 'next/image'

export default function Content() {
  return (
    <div style={{width:600,height:628}}>
      <Image alt='placeholder' style={{objectFit:"cover",width:600,height:628,boxShadow:'5px 5px 5px #000000'}} src={sample5}/>
    </div>
  );
}
