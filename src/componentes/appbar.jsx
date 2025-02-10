import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" style={{background:"transparent", boxShadow:"none"}}>
        <Toolbar>
        <Link href="/home" style={{color:"white"}}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 5 }}
          >
            
            <MenuIcon />
    
            
          </IconButton>
          </Link>
          <Button variant="h6" component="div" sx={{width:125, height:40}} >
            <p style={{fontWeight:"bold"}}>Cursos</p>
          </Button>
          <Button variant="h6" component="div" sx={{width:125, height:40}} >
            <p style={{fontWeight:"bold"}}>Blog</p>
          </Button>
          <Button variant="h6" component="div" sx={{width:125, height:40}} >
            <p style={{fontWeight:"bold"}}>Clases</p>
          </Button>
          <Link href="/signin"><Button variant="h6" component="div" sx={{width:125, height:40}} >
            <p style={{fontWeight:"bold",color:"white"}}>Acceder</p >
          </Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
