import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';
import useWindowDimensions from "../Hooks/GetWindowDimensions";

export default function SimpleCollapse() {
  const [checked, setChecked] = React.useState(false);
  const { height, width } = useWindowDimensions();

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  function cambiar(params) {
    if (checked) {
        setChecked(false)
    }else{
        setChecked(true)
    }
  }

  return (
    <>
    <Collapse in={checked} collapsedSize={150} onClick={()=>cambiar()}>
      <Typography variant="body1" gutterBottom style={{marginLeft:width*0.10,marginRight:width*0.10,marginTop:50}}>
      Bienvenidos al Fitness and Health Institute, una escuela en línea en español dedicada a ayudar a las personas a convertir su pasión por el Fitness en una carrera. En FHI, creemos que el bienestar físico es esencial para la calidad de vida y estamos comprometidos en ofrecer un programa educativo integral y de alta calidad que permita a nuestros estudiantes cumplir con sus objetivos profesionales <span style={{color:"blue"}}>Leer Más.</span>
      </Typography>

      <Typography variant="body1" gutterBottom style={{marginLeft:width*0.10,marginRight:width*0.10,marginTop:50}}>
      La escuela FHI ofrece una formación en línea en español que cubre todos los aspectos del Fitness, desde la nutrición y la fisiología hasta la planificación y la ejecución de programas de entrenamiento efectivos. Nuestros estudiantes pueden aprender a su propio ritmo, desde cualquier lugar y en cualquier momento, lo que permite a aquellos con horarios apretados o compromisos personales continuar con su educación sin interrupción.
      </Typography>

      <Typography variant="body1" gutterBottom style={{marginLeft:width*0.10,marginRight:width*0.10,marginTop:50}}>
      En FHI, nos enorgullece contar con un equipo de instructores altamente cualificados y experimentados en la industria del Fitness. Nuestros profesores no solo tienen experiencia práctica en el campo, sino que también tienen una formación académica sólida en las áreas de la salud y el ejercicio físico, lo que garantiza que nuestros estudiantes reciban la mejor educación posible.
      </Typography>

      <Typography variant="body1" gutterBottom style={{marginLeft:width*0.10,marginRight:width*0.10,marginTop:50}}>
      Nuestra escuela se centra en desarrollar habilidades prácticas, ofreciendo a los estudiantes la oportunidad de aplicar los conocimientos adquiridos en situaciones reales de la vida laboral. Esto se logra a través de proyectos prácticos, discusiones en línea y otras actividades interactivas que permiten a los estudiantes aplicar lo aprendido en la escuela en su carrera en el mundo del Fitness.
      </Typography>

      <Typography variant="body1" gutterBottom style={{marginLeft:width*0.10,marginRight:width*0.10,marginTop:50}}>
      En resumen, si buscas una carrera en la industria del Fitness, el Fitness and Health Institute es la elección perfecta para ti. Nos enorgullece ofrecer una educación de calidad y accesible en línea en español que te ayudará a alcanzar tus objetivos profesionales y transformar tu pasión por el Fitness en una carrera exitosa. Únete a nosotros en FHI y juntos haremos realidad tus sueños.
      </Typography>

          </Collapse>
          </>
  );
}
