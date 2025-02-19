'use client'
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import AlertDialog from "../componentes/AlertDialog";

const columns = [
  { field: 'id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Nombre', width: 350 },
  {
    field: 'price',
    headerName: 'Precio',
    type: 'number',
    width: 90,
  },
  {
    field: 'students',
    headerName: 'Alumnos',
    type: 'number',
    width: 90,
  },
  {
    field: 'options',
    headerName: 'Opciones',
    width: 150,
    renderCell: (params) => <OptionsMenu params={params} />
  }
];

const paginationModel = { page: 0, pageSize: 5 };

function OptionsMenu({ params }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log('Edit', params.row);
    handleClose();
  };

  const handleDelete = () => {
    console.log('Delete', params.row);
    handleClose();
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <Link href={{ pathname: "/EditGrade", query: { id: params.row.id } }} style={{ fontWeight: "bold", color: "black" }}><MenuItem onClick={handleEdit}>Editar Informacion</MenuItem></Link>
        <MenuItem><AlertDialog vidId={params.row.vidId} id={params.row.id}></AlertDialog></MenuItem>
      </Menu>
    </div>
  );
}

export default function DataTable() {
  const { data: session, status } = useSession();
  const [rows, setRows] = React.useState([]);

  const initializePage = () => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) return; // Do nothing if not authenticated

    const config = {
      headers: { Authorization: `Bearer ${session.user.token}` }
    };

    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/getGradesTable`, config)
      .then(function (response) {
        // handle success
        console.log(response.data);
        setRows(response.data.map((grade, index) => ({
          id: grade._id,
          name: grade.name,
          price: grade.price,
          students: grade.students,
          vidId: grade.vidId
        })));
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
  }, [status, session]);

  return (
    <Paper sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 15]}
      />
    </Paper>
  );
}