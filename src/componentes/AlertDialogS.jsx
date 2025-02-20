import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { deleteVideo } from "../actions/vimeosdk";
import axios from 'axios';
import { useSession } from "next-auth/react";

export default function AlertDialog(params) {

    const { data: session, status } = useSession();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {

        const config = {
            headers: { Authorization: `Bearer ${session.user.token}` }
        };
        
        console.log(session.user.token)
        const axiosres = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/deleteUser/${params.id}`,config);
        console.log(axiosres.data);

        handleClose();
        window.location.reload();
    } catch (error) {
        console.error('Failed to delete grade:', error);
    }
};


  return (
    <React.Fragment>
      <Typography variant="outlined" onClick={handleClickOpen}>
        Eliminar Alumno
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seguro que desea eliminar el Alumno?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si continua se eliminara el alumno, se perdera todos sus datos y el acceso a todos los cursos que este poseia.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDelete} autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
