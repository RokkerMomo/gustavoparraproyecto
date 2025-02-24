'use client'
import { Alert, Box, Button, CircularProgress, FormControl, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import BasicAppBar from "../../componentes/appbar.jsx";
import sample1 from "../../assets/Sample1.webp";
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import React, { useState, Suspense } from 'react'
import Chip from '@mui/material/Chip';
import CheckIcon from '@mui/icons-material/Check';
import './EditStudent.css'
import { useTheme } from '@mui/material/styles';
import Select from '@mui/material/Select';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import { useSession, signOut } from "next-auth/react";
import { useSearchParams } from 'next/navigation'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function EditStudentPage() {
  const [active, setactive] = useState(false)
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [clases, setClases] = React.useState([]);
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setname] = useState("");
  const [document, setdocument] = useState("");
  const [role, setrole] = useState("user"); // Default role is "user"
  const [showalert, setshowalert] = useState(false);
  const [error, setError] = useState(null);
  const [showerror, setshowerror] = useState(false)
  const { data: session, status } = useSession();
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  async function handleCreate() {
    const config = {
      headers: { Authorization: `Bearer ${session.user.token}` }
    };

    const requestData = {
      classIds: personName,
      updateData:{
        name:name,
        document:document,
        role:role
      }
    };

    console.log(requestData);

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/updateUser/${id}`, requestData, config);
      console.log(response);
      setshowalert(true);
      setError(response.data.msg);
      setTimeout(
        () => {
          setshowalert(false);
        }
        , 2000)
    } catch (error) {
      console.error(error);
      setError(error.response ? error.response.data.msg : error.message);
      setshowerror(true);
      setTimeout(
        () => {
          setshowerror(false);
        }
        , 2000)
    }
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const initializePage = () => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/grades`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setClases(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });


    const config = {
      headers: { Authorization: `Bearer ${session?.user?.token}` }
    };

    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getUserById/${id}`, config)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setname(response.data.user.name)
        setdocument(response.data.user.document)
        const gradeIds = response.data.grades.map(grade => grade._id);
        setPersonName(gradeIds);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  };

  React.useEffect(() => {
    initializePage();
  }, []);

  function getStyles(name, personName, theme) {
    return {
      fontWeight: personName.includes(name)
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    };
  }

  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 48,
    height: 26,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 25,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(19px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(22px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: '#7c3030',
          ...theme.applyStyles('dark', {
            backgroundColor: '#177ddc',
          }),
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 22,
      height: 22,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
      ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255,255,255,.35)',
      }),
    },
  }));

  const handleRoleChange = (event) => {
    setrole(event.target.checked ? "admin" : "user");
  };

  return (
    <div>
      <BasicAppBar></BasicAppBar>
      <div className='background' style={{
        backgroundImage: `url(${sample1.src})`
      }}>
        <div className='form' >
          <h2 style={{ color: "#7c3030", }}>Editar usuario</h2>
          <div className='Data'>
            <div className='smalldata'>
              <TextField value={name} onChange={(e) => { setname(e.target.value) }} color='#7c3030' id="outlined-basic" label="Nombre" variant="outlined" />
              <TextField value={document} onChange={(e) => { setdocument(e.target.value) }} color='#7c3030' id="outlined-basic" label="Cedula" variant="outlined" />
              <div>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-chip-label">Cursos</InputLabel>
                  <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput id="Clases" label="Clases" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const selectedClass = clases.find((Class) => Class._id === value);
                          return <Chip key={value} label={selectedClass ? selectedClass.name : value} />;
                        })}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    {clases && clases.map((Class) => (
                      <MenuItem
                        key={Class._id}
                        value={Class._id}
                        style={getStyles(Class.name, personName, theme)}
                      >
                        {Class.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Typography>Alumno</Typography>
                <AntSwitch checked={role === "admin"} onChange={handleRoleChange} inputProps={{ 'aria-label': 'ant design' }} />
                <Typography>Administrador</Typography>
              </Stack>
            </div>
          </div>
          <Button
            onClick={handleCreate}
            sx={{ backgroundColor: "#7c3030" }}
            variant="contained"
          >
            Editar
          </Button>
          {showalert && <Alert sx={{ position: "absolute" }} icon={<CheckIcon fontSize="inherit" />} severity="success">
            {error}
          </Alert>}
          {showerror && <Alert sx={{ position: "absolute" }} severity="error">
            {error}
          </Alert>}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditStudentPage />
    </Suspense>
  );
}