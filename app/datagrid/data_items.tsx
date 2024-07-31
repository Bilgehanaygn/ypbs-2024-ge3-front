import React from 'react';
import { Grid, Typography, Card } from '@mui/material';

export function DataItems({ nameSurname, birim, email, gorev, proje, telefon, unvan }) {
    return (
        <Card style={{width: '80%'}}>
            <Grid container style={{ width: '150%', marginBottom: '8px' }} spacing={1}>
                <Grid item xs={2} style={{ textAlign: 'center' }}>
                    <Typography>{nameSurname}</Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'center' }}>
                    <Typography>{birim}</Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'center' }}>
                    <Typography>{unvan}</Typography>
                </Grid>
                <Grid item xs={2} style={{ textAlign: 'center' }}>
                    <Typography>{gorev}</Typography>
                    <Typography>{proje}</Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'center' }}>
                    <Typography>{email}</Typography>
                </Grid>
                <Grid item xs={1} style={{ textAlign: 'center' }}>
                    <Typography>{telefon}</Typography>
                </Grid>

            </Grid>
        </Card>

    );
}