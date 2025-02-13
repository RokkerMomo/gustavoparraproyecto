'use client'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import { Menu, MenuItem } from '@mui/material';
import { useSession, signOut } from "next-auth/react";
import AdbIcon from '@mui/icons-material/Adb';
import { useParams } from 'next/navigation'

export default function ButtonAppBar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const params = useParams()
  
  const { data: session, status } = useSession();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="absolute" style={{ background: "transparent", boxShadow: "none" }}>
        <Toolbar>
          <Link href="/home" style={{ color: "white" }}>



            {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>
          </Link>
          <Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
            <p style={{ fontWeight: "bold", color: "white" }}>Cursos</p>
          </Button>
          <Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
            <p style={{ fontWeight: "bold", color: "white" }}>Blog</p>
          </Button>
          <Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
            <p style={{ fontWeight: "bold", color: "white" }}>Clases</p>
          </Button>
          {
            !session && <Link href="/signin"><Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
              <p style={{ fontWeight: "bold", color: "white" }}>Acceder</p >
            </Button></Link>
          }


          {
            session?.user.role == "admin" && <>
              <Button variant="h6" component="div" sx={{ width: 125, height: 40 }}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <p style={{ fontWeight: "bold", color: "white" }}>Admin</p>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={handleClose}>Manejar Cursos y Usuarios</MenuItem>
                <MenuItem onClick={handleClose}>Administrar clases</MenuItem>
                <MenuItem onClick={() => { signOut(); }}>Cerrar Sesion</MenuItem>
              </Menu>
            </>
          }


        </Toolbar>
      </AppBar>
    </Box>
  );
}
