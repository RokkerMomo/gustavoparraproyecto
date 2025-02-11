import * as React from 'react';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Paper from '@mui/material/Paper';
import Collapse from '@mui/material/Collapse';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';

export default function SimpleCollapse() {
  const [checked, setChecked] = React.useState(false);

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
      <Typography variant="body1" gutterBottom style={{marginLeft:"10%",marginRight:"10%",marginTop:50}}>
      
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore veniam ipsa officia molestias rerum ea a, omnis non alias qui tenetur, laborum necessitatibus, saepe odio voluptatum voluptatem obcaecati! Reprehenderit, in? Facere, fuga fugit sequi eligendi, quas praesentium ut maiores ex tempora enim nulla. Quisquam iusto ex cumque officia saepe vero?
      <span style={{color:"blue"}}>Leer Más.</span>
      </Typography>

      <Typography variant="body1" gutterBottom style={{marginLeft:"10%",marginRight:"10%",marginTop:50}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque ea magni nihil aperiam nisi. Error illo sint dignissimos! Distinctio natus quis error et sit, vel dignissimos exercitationem expedita animi facilis suscipit impedit! Optio eum quibusdam assumenda dolore, laudantium facere deserunt mollitia blanditiis distinctio asperiores, aut doloribus perferendis est pariatur repudiandae?
      </Typography>

      <Typography variant="body1" gutterBottom style={{marginLeft:"10%",marginRight:"10%",marginTop:50}}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus quisquam eveniet, ex inventore dolorem optio esse dolores, aliquid officiis, recusandae iure exercitationem voluptatibus sequi? Praesentium magnam repudiandae et, tempore blanditiis provident, aliquid officia delectus autem dignissimos ad quaerat quisquam ab distinctio? Nemo earum consequatur culpa quis eos suscipit explicabo ut.
      </Typography>

      <Typography variant="body1" gutterBottom style={{marginLeft:"10%",marginRight:"10%",marginTop:50}}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit perferendis et vitae rerum. Amet perspiciatis fugit harum atque, ducimus voluptatibus alias modi perferendis quis, expedita obcaecati vero magnam reiciendis, necessitatibus molestiae laudantium omnis autem quidem assumenda ullam porro? Beatae laudantium distinctio quidem voluptate alias architecto nulla est recusandae odio sunt?
      </Typography>

      <Typography variant="body1" gutterBottom style={{marginLeft:"10%",marginRight:"10%",marginTop:50}}>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor distinctio, sequi, cupiditate laborum consequuntur sit reprehenderit maiores, ratione omnis ipsum dicta consequatur dolores iusto corporis nihil quam odio! Necessitatibus vitae cumque natus quo quisquam beatae labore facilis, vero quos reiciendis vel tempore pariatur ullam rem possimus atque repudiandae. Sapiente, perferendis.
      </Typography>

          </Collapse>
          </>
  );
}
