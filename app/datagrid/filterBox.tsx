import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';

const FilterBox = ({title, setFunction, link}) => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchUnvans = async () => {
      try {
        const response = await axios.get(link);
        setOptions(response.data);
      } catch (error) {
        console.error('Error fetching unvans:', error);
      } 
    };

    fetchUnvans();
  }, []);

  const handleChange = (event, newValue) => {
    setFunction(newValue);
  };

  return (
    
    <Autocomplete
        size= "small"
        fullWidth
      options={options}
      getOptionLabel={(option) => option}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField {...params} label={title} variant="outlined" />
      )}
    />
  );
};

export default FilterBox;
