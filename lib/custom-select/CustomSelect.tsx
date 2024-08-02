import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useEffect, useState} from "react";
import axios from "axios";

interface CustomSelectProps {
    customLabel?: string;
    fetchEndpoint: string;
    selectedValue?: string;
    onChange?: (value: string) => void;
}

export default function CustomSelect({fetchEndpoint, customLabel="", selectedValue = "", onChange}: CustomSelectProps) {

    const [fetchedItems, setFetchedItems] = useState<string[]>([]);
    const [internalSelectedValue, setInternalSelectedValue] = useState<string>(selectedValue);
    const [error, setError] = useState<String | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<string[]>(fetchEndpoint)
                setFetchedItems(response.data);
            } catch (error) {
                console.log(error.message);
                setError("Error fetching data");
            }
        }
        fetchData();
    }, [fetchEndpoint]);

    const handleChange = (event) => {
        const newSelection = event.target.value;
        setInternalSelectedValue(newSelection);
        // onChange(newSelection);
    };

    if (error) {
        return <MenuItem value="" sx={{maxWidth: 150}} >Error loading data</MenuItem>;
    }

    return (
        <Box >
            <FormControl sx={{maxWidth: 150}} size={"small"} fullWidth> {/*TODO: Add different themes*/}
                <InputLabel id="custom-select-label">{customLabel}</InputLabel>
                <Select
                    labelId="custom-select-label"
                    id="custom-select"
                    value={internalSelectedValue}
                    label={customLabel}
                    onChange={handleChange}
                >
                    {fetchedItems.map((item, index) => (
                        <MenuItem key={index} value={item}>{item}</MenuItem>
                        )
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}