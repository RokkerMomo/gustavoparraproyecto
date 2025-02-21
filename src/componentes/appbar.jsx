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
import { Avatar, Menu, MenuItem } from '@mui/material';
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
          {/* <Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
            <p style={{ fontWeight: "bold", color: "white" }}>Cursos</p>
          </Button>
          <Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
            <p style={{ fontWeight: "bold", color: "white" }}>Blog</p>
          </Button>
          <Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
            <p style={{ fontWeight: "bold", color: "white" }}>Clases</p>
          </Button> */}
          {
            !session && <Link href="/signin"><Button variant="h6" component="div" sx={{ width: 125, height: 40 }} >
              <p style={{ fontWeight: "bold", color: "white" }}>Acceder</p >
            </Button></Link>
          }


          {
            session?.user.role == "admin" && <>
                <Avatar style={{marginLeft:"auto"}} onClick={handleClick} >{Array.from(session?.user.name)[0]}</Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                
                <Link href="/ManageGrades"><MenuItem onClick={handleClose}>Administrar Cursos</MenuItem></Link>
                <Link href="/ManageStudents"><MenuItem onClick={handleClose}>Administrar Usuarios</MenuItem></Link>
                <Link href="/HomeClass"><MenuItem onClick={handleClose}>Administrar Clases</MenuItem></Link>
                <MenuItem onClick={() => { signOut(); }}>Cerrar Sesion</MenuItem>
              </Menu>
            </>
          }

{
            session?.user.role == "user" && <>
                <Avatar style={{marginLeft:"auto"}} onClick={handleClick} >{Array.from(session?.user.name)[0]}</Avatar>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                disableScrollLock={true}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <Link href="/HomeClass"><MenuItem onClick={handleClose}>Clases</MenuItem></Link>
                <MenuItem onClick={() => { signOut(); }}>Cerrar Sesion</MenuItem>
              </Menu>
            </>
          }


        </Toolbar>
      </AppBar>
    </Box>
  );
}
