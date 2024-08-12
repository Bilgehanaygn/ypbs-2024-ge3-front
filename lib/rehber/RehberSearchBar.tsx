"use client";

import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, TextField } from '@mui/material';
import AutocompleteSelectBox from './AutocompleteSelectBox';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { GridRowsProp } from '@mui/x-data-grid';

interface RehberSearchBarProps {
    variant: string;
}

const RehberSearchBar: React.FC<RehberSearchBarProps> = ({variant}) => {
    const [nameSurname, setNameSurname] = useState<string>('');
    const [unvan, setUnvan] = useState<string>('');
    const [gorev, setGorev] = useState<string>('');
    const [birim, setBirim] = useState<string>('');
    const [proje, setProje] = useState<string>('');
    const [takim, setTakim] = useState<string>('');
    
    
    const { data: users } = useSWR("/api/user/findUsersWithFilters", async () => {
        const response = await axios.get("/api/user/findUsersWithFilters", {
          params: {
            nameSurname,
            birim,
            unvan,
            gorev,
            proje,
            takim,
          },
        });
        return response.data;
    },{ revalidateOnFocus: false });

    useEffect(() => {
        mutate("/api/user/findUsersWithFilters");
    }, [nameSurname, unvan, gorev, birim, proje, takim]);

   
    return (
        <Box>
        {variant==="rehber" && <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', 
            gap: '8px',
            boxSizing: 'border-box'}}
        >
            <Box>
                <TextField
                    style={{width: '250px'}} 
                    label="İsim Soyisim"
                    variant="outlined"
                    size= "small"
                    value={nameSurname}
                    onChange={(e) => setNameSurname(e.target.value)}
                />
            </Box>
    
            <AutocompleteSelectBox 
                title={"Birim"}
                setFunction={setBirim}
                link={'/api/kurumsal/getBirims'}
            />
    
            <AutocompleteSelectBox 
                title={"Unvan"}
                setFunction={setUnvan}
                link={'/api/kurumsal/getUnvans'}
            />
    
            <AutocompleteSelectBox 
                    title={"Görev"}
                    setFunction={setGorev}
                    link={'/api/kurumsalProje/getGorevs'}
                />
    
            <AutocompleteSelectBox 
                title={"Proje"}
                setFunction={setProje}
                link={'/api/proje/getProjectNames'}
            />
    
            <AutocompleteSelectBox 
                title={"Takım"}
                setFunction={setTakim}
                link={'/api/proje/getTeams'}
            />
    
            <Box>
                <Button
                    variant="contained"
                    color="success"
                    sx={{ 
                        backgroundColor: 'green', 
                        color: 'white', 
                        width: '140px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.78,
                        justifyContent: 'center',
                        '&:hover': {
                           backgroundColor: "darkgreen",
                        }
                     }}
                >
                    <AddIcon fontSize="small"/> 
                    Personel Ekle
                </Button>
            </Box>
        </Box>}

        {variant==="home" && <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between', 
            gap: '8px',
            boxSizing: 'border-box'}}
        >
            <Box>
                <TextField
                    style={{width: '250px'}} 
                    label="İsim Soyisim"
                    variant="outlined"
                    size= "small"
                    value={nameSurname}
                    onChange={(e) => setNameSurname(e.target.value)}
                />
            </Box>
    
            <Box sx={{display: "flex", width:800}}>
                <AutocompleteSelectBox 
                    title={"Birim"}
                    setFunction={setBirim}
                    link={'/api/kurumsal/getBirims'}
                />
        
                <AutocompleteSelectBox 
                    title={"Unvan"}
                    setFunction={setUnvan}
                    link={'/api/kurumsal/getUnvans'}
                />
        
                <AutocompleteSelectBox 
                        title={"Görev"}
                        setFunction={setGorev}
                        link={'/api/kurumsalProje/getGorevs'}
                    />
        
                <AutocompleteSelectBox 
                    title={"Proje"}
                    setFunction={setProje}
                    link={'/api/proje/getProjectNames'}
                />
            </Box>
          
        </Box>}

        </Box>
    );
};

export default RehberSearchBar;
