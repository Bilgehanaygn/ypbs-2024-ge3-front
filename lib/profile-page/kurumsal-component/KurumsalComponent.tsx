import {Box, Card, Grid, TextField, Typography} from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import React from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";

export default function KurumsalComponent() {
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
                    <Typography variant="subtitle1" color="black" ml={1} fontSize="small">KURUMSAL</Typography>
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
                                       label="İşe Giriş Tarihi"
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            ></TextField>
                        </ThemeProvider>


                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Kadro"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Birim"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Görevi"
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Personel Türü"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Çalışma Durumu"
                                InputLabelProps={{
                                    shrink: true,
                                }}

                            ></TextField>
                        </ThemeProvider>


                        <TextField
                            label="Dahili Numara"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        ></TextField>
                    </Grid>


                    <Grid lg={6}>
                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Sicil No"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Unvan"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Çalışılan Proje"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Takım"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Çalışma Türü"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                label="Servis Kullanımı"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            ></TextField>
                        </ThemeProvider>

                        <TextField
                            label="Oda Numara"
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
