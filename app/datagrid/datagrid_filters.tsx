import React from 'react';
import { TextField, Button, MenuItem, Box, Card } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import FilterBox from './filterBox';

export function DatagridFilters({
  nameSurname, unvan, gorev, birim, proje, katki, takim,
  setNameSurname, setUnvan, setGorev, setBirim, setProje, setKatki, setTakim
}) {


  const inputStyle = {
    flex: 1,
  };

  return (
    <Card sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', 
        gap: '8px',
        boxSizing: 'border-box', 
    }}>
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

        <FilterBox 
            title={"Birim"}
            setFunction={setBirim}
            link={'/api/kurumsal/getBirims'}
        />

        <FilterBox 
            title={"Unvan"}
            setFunction={setUnvan}
            link={'/api/kurumsal/getUnvans'}
        />

        <FilterBox 
                title={"Görev"}
                setFunction={setGorev}
                link={'/api/kurumsalProje/getGorevs'}
            />

        <FilterBox 
            title={"Proje"}
            setFunction={setProje}
            link={'/api/proje/getNames'}
        />

        <FilterBox 
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
                    justifyContent: 'flex-start',
                    '&:hover': {
                       backgroundColor: "darkgreen",
                    }
                 }}
            >
                <AddIcon fontSize="small"/> 
                Personel Ekle
            </Button>

        </Box>
    </Card>
  );
}
