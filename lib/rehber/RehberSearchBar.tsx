"use client";

import React from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Card, IconButton, TextField, Typography } from '@mui/material';
import AutocompleteSelectBox from './autocompleteSelectBox';

interface RehberSearchBarProps {
    variant: string;
    nameSurname: string;
    unvan: string;
    gorev: string;
    birim: string;
    proje: string;
    takim: string;
    setNameSurname: (value: string) => void;
    setUnvan: (value: string) => void;
    setGorev: (value: string) => void;
    setBirim: (value: string) => void;
    setProje: (value: string) => void;
    setTakim: (value: string) => void;
}

const RehberSearchBar: React.FC<RehberSearchBarProps> = ({ variant,
    nameSurname, unvan, gorev, birim, proje, takim,
    setNameSurname, setUnvan, setGorev, setBirim, setProje, setTakim}) => {
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
                link={'/api/proje/getNames'}
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
                    link={'/api/proje/getNames'}
                />
            </Box>
          
        </Box>}

        </Box>
    );
};

export default RehberSearchBar;
