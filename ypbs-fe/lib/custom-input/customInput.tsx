"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import useSWR from "swr";
import { CUSTOM_INPUT } from "../../app/api_helper/URLs";
import { getFetcher } from "../../app/api_helper/fetchers";

interface BasicSelectProps {
  endpoint: string;
}

const BasicSelect: React.FC<BasicSelectProps> = ({ endpoint }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");
  const { data, error } = useSWR(CUSTOM_INPUT(), getFetcher);
  console.log(data);

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedValue(event.target.value as string);
  };

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel></InputLabel>
        <Select value={selectedValue} label="Select" onChange={handleChange}>
          {data ? (
            data.map((item: string) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">Loading...</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};

export default BasicSelect;
