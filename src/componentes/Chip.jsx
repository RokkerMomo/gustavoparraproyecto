import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import axios from 'axios';

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

export default function MultipleSelectChip() {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [clases, setClases] = React.useState([]);

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

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
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
      <button onClick={() => {
        console.log(personName);
      }}>A</button>
    </div>
  );
}