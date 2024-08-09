import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useEffect, useState } from "react";
import axios from "axios";

interface CustomSelectProps {
    customLabel?: string;
    fetchEndpoint: string;
    selectedValue?: string;
    onChange?: (event: SelectChangeEvent<string>) => void;
}

export default function CustomSelect({ fetchEndpoint, customLabel = "", selectedValue = "", onChange = () => {} }: CustomSelectProps) {
    const [fetchedItems, setFetchedItems] = useState<string[]>([]);
    const [internalSelectedValue, setInternalSelectedValue] = useState<string>(selectedValue);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<string[]>(fetchEndpoint);
                setFetchedItems(response.data);
            } catch (error) {
                console.log(error.message);
                setError("Error fetching data");
            }
        };
        fetchData();
    }, [fetchEndpoint]);

    useEffect(() => {
        setInternalSelectedValue(selectedValue);
    }, [selectedValue]);

    const handleChange = (event: SelectChangeEvent<string>) => {
        const newSelection = event.target.value;
        setInternalSelectedValue(newSelection);
        onChange(event);
    };

    if (error) {
        return <MenuItem value="" sx={{ maxWidth: "150px", fontSize: "0.81rem", padding: "0px 0px", color: "black"}}>Error loading data</MenuItem>;
    }

    return (
            <FormControl sx={{ fontSize: "0.80rem", color: "black", marginTop: '0px', paddingTop: '0px', maxWidth: "150px" }} fullWidth>
                <InputLabel id="custom-select-label" sx={{ fontSize: "0.80rem", color: "black" }}>{customLabel}</InputLabel>
                <Select
                    variant={"standard"}
                    labelId="custom-select-label"
                    id="custom-select"
                    value={internalSelectedValue}
                    label={customLabel}
                    onChange={handleChange}
                    sx={{ fontSize: "0.81rem", color: "black", padding: "0px 0px", marginTop: '0px', paddingTop: '0px' }}
                >
                    {fetchedItems.map((item, index) => (
                        <MenuItem key={index} value={item} sx={{ fontSize: "0.80rem", color: "black" }}>{item}</MenuItem>
                    ))}
                </Select>
            </FormControl>
    );
}
