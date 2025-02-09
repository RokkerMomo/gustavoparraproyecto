import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" style={{background:"transparent", boxShadow:"none"}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 5 }}
          >
            <MenuIcon />
          </IconButton>
          <Button variant="h6" component="div" sx={{width:125, height:40}} >
            <p style={{fontWeight:"bold"}}>Cursos</p>
          </Button>
          <Button variant="h6" component="div" sx={{width:125, height:40}} >
            <p style={{fontWeight:"bold"}}>Blog</p>
          </Button>
          <Button variant="h6" component="div" sx={{width:125, height:40}} >
            <p style={{fontWeight:"bold"}}>Clases</p>
          </Button>
          <Button variant="h6" component="div" sx={{width:125, height:40}} >
            <p style={{fontWeight:"bold"}}>Acceder</p>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
