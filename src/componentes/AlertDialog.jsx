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

export default function AlertDialog(vidId) {

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
    
        const res = await deleteVideo(vidId.vidId);
        console.log(res);
        console.log("video borrado con exito");

        const config = {
            headers: { Authorization: `Bearer ${session.user.token}` }
        };
        
        console.log(session.user.token)
        const axiosres = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/DeleteGrade/${vidId.id}`,config);
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
        Eliminar Curso
      </Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Seguro que desea eliminar el curso?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Si elimina el curso se eliminara de la pagina principal y todas las clases relacionadas
            a este curso se perderan, quiere continuar ?
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
