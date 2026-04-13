import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { useState } from 'react';
export default function FreeSolo(props) {
  
  // let [selectedOption,setSelectedOption] = useState(null);
  return (
      <Autocomplete
        className='outline-none w-[160px]' 

        onChange={(e,val)=>props.assigned(val)}
        options={top100Films.map((option) => option)}
        renderInput={(params) => <TextField className='nodrag' required  {...params} label="assign user" />}
      />
  );
}

const top100Films = [
    "rohith","vinod"
];
