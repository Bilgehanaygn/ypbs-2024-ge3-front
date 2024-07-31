import React from 'react';
import { Grid, Typography, Card } from '@mui/material';

export function DataItemHeadings() {
    const cardStyle = {
        width: '80%',
        marginBottom: '8px',
        padding: '8px', // Example padding around the card content
    };

    const headingItemStyle = {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.9rem',

    };

    return (
        <Card style={cardStyle}>
            <Grid container spacing={1} style={{width: "150%"}}>

                <Grid item xs={2} style={headingItemStyle}>
                    <Typography variant="h5">Ad Soyad</Typography>
                </Grid>

                <Grid item xs={1} style={headingItemStyle}>
                    <Typography variant="h5">Birim</Typography>
                </Grid>
                <Grid item xs={1} style={headingItemStyle}>
                    <Typography variant="h5">Ünvan</Typography>
                </Grid>
                <Grid item xs={2} style={headingItemStyle}>
                    <Typography variant="h5">Görev</Typography>
                </Grid>
                <Grid item xs={1} style={headingItemStyle}>
                    <Typography variant="h5">E-mail</Typography>
                </Grid>
                <Grid item xs={1} style={headingItemStyle}>
                    <Typography variant="h5">Telefon</Typography>
                </Grid>

            </Grid>
        </Card>
    );
}
