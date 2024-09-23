import {Box, Card, Grid, TextField, Typography} from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";

export default function KisiselComponent() {
    const disabledTheme = createTheme({
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray', // Border color for the edges
                        },
                        '& .MuiOutlinedInput-root': {
                            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'lightgray', // Ensure border color is gray when disabled
                            },
                        },
                        '& .MuiInputLabel-root': {
                            color: 'lightgray', // Label color for disabled state
                        },
                    }
                }
            }
        }
    });

    return (
        <Card>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" justifyContent="left" p={2}>
                    <ContactsIcon color="inherit" fontSize="small"/>
                    <Typography variant="subtitle1" color="black" ml={1} fontSize="small">KİŞİSEL</Typography>
                </Box>
            </Box>


            <Box component="form"
                 sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }}
                 noValidate
                 autoComplete="off"
                //onSubmit={handleSubmit}*/ sx={{mt: 1}}
            >
                <Grid container spacing={0} p={0} alignItems="center">
                    <Grid lg={6}>
                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                               label="Ad"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                            ></TextField>
                        </ThemeProvider>


                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="T.C. Kimlik Numarası"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Akademik Unvan"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <TextField
                            label="Doğum Tarihi"
                            InputLabelProps={{
                                shrink: true,
                            }}

                        ></TextField>

                        <TextField
                            label="Telefon"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        ></TextField>

                        <TextField
                            label="Acil Durumda Ulaşılacak Kişi"
                            InputLabelProps={{
                                shrink: true,
                            }}

                        ></TextField>
                    </Grid>


                    <Grid lg={6}>
                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Soyad"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Cinsiyet"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="E-posta"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <TextField
                            label="Kan Grubu"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        ></TextField>

                        <TextField
                            label="Araç Plakası"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        ></TextField>

                        <TextField
                            label="Acil Durumda Ulaşılacak Kişi Tel"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        ></TextField>

                    </Grid>

                    <Grid lg={12}>
                        <TextField fullWidth
                               label="İkametgah Adresi"
                               InputLabelProps={{
                                   shrink: true,
                               }}
                        ></TextField>
                    </Grid>

                </Grid>
            </Box>
        </Card>
    );
}
