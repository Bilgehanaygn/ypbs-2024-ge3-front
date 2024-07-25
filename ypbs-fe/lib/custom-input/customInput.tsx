"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState, useEffect } from "react";
import axios from "axios";

interface CustomInputProps {
  endpoint: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ endpoint }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<string[]>(`api/dummy/dummy`);
        setData(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string);
  };

  if (loading) {
    return <MenuItem value="">Loading...</MenuItem>;
  }

  if (error) {
    return <MenuItem value="">Error loading data</MenuItem>;
  }

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel></InputLabel>
        <Select value={selectedValue} label="Select" onChange={handleChange}>
          {data.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default CustomInput;
