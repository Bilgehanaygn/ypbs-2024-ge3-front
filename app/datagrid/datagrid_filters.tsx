import React from 'react';
import { Grid, Typography, Card, TextField, Button } from '@mui/material';

export function DatagridFilters({ nameSurname, unvan, gorev, birim, proje, katki, takim, setNameSurname, setUnvan, setGorev, setBirim, setProje, setKatki, setTakim, handleSearch }) {

    const cardStyle = {
        padding: '16px',
        marginBottom: '16px',
    };

    const inputStyle = {
        marginBottom: '16px',
    };

    const buttonStyle = {
        marginTop: '16px',
    };

    return (
        <Card style={cardStyle}>
            <Grid container spacing={2}>
                <Grid item xs={1.5} >
                    <TextField
                        style={inputStyle}
                        fullWidth
                        label="İsim Soyisim"
                        variant="outlined"
                        value={nameSurname}
                        onChange={(e) => setNameSurname(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1.5} >
                    <TextField
                        style={inputStyle}
                        fullWidth
                        label="Unvan"
                        variant="outlined"
                        value={unvan}
                        onChange={(e) => setUnvan(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1.5} >
                    <TextField
                        style={inputStyle}
                        fullWidth
                        label="Görev"
                        variant="outlined"
                        value={gorev}
                        onChange={(e) => setGorev(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <TextField
                        style={inputStyle}
                        fullWidth
                        label="Birim"
                        variant="outlined"
                        value={birim}
                        onChange={(e) => setBirim(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <TextField
                        style={inputStyle}
                        fullWidth
                        label="Proje"
                        variant="outlined"
                        value={proje}
                        onChange={(e) => setProje(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <TextField
                        style={inputStyle}
                        fullWidth
                        label="Katkı"
                        variant="outlined"
                        value={katki}
                        onChange={(e) => setKatki(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1.5} >
                    <TextField
                        style={inputStyle}
                        fullWidth
                        label="Takım"
                        variant="outlined"
                        value={takim}
                        onChange={(e) => setTakim(e.target.value)}
                    />
                </Grid>
                <Grid item xs={1.5}>
                    <Button
                        style={buttonStyle}
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleSearch}
                    >
                        Sorgula
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}
