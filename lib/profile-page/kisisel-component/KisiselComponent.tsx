import {Box, Card, Grid, TextField, Typography} from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import React, {useEffect, useState} from "react";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import axios from "axios";
import {KanGrubu, UserKisiselInterface} from "@/lib/common/user/user";
import MenuItem from "@mui/material/MenuItem";

export default function KisiselComponent() {

    const [user, setUser] = useState<UserKisiselInterface | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await axios.get<UserKisiselInterface>("/api/user/userKisisel");
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user data", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

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

    if (loading) {
        // Show a loading state until user data is available
        return (
            <Typography variant="subtitle1" color="textSecondary">
                Loading...
            </Typography>
        );
    }

    const getEnumValues = <T extends object>(enumObj: T): Array<T[keyof T]> => {
        return Object.values(enumObj) as Array<T[keyof T]>;
    };

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
                               value={user.isim}
                               InputLabelProps={{
                                   shrink: true,
                               }}
                            ></TextField>
                        </ThemeProvider>


                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                       label="T.C. Kimlik Numarası"
                                       value={user.tcKimlikNo}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                       label="Akademik Unvan"
                                       value={user.akademikUnvan}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            ></TextField>
                        </ThemeProvider>

                        <TextField
                            label="Doğum Tarihi"
                            value={user.dogumTarihi}
                            InputLabelProps={{
                                shrink: true,
                            }}

                        ></TextField>

                        <TextField
                            label="Telefon"
                            value={user.telefon}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        ></TextField>

                        <TextField
                            label="Acil Durumda Ulaşılacak Kişi"
                            value={user.acilDurumKisi}
                            InputLabelProps={{
                                shrink: true,
                            }}

                        ></TextField>
                    </Grid>


                    <Grid lg={6}>
                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                       label="Soyad"
                                       value={user.soyisim}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                       label="Cinsiyet"
                                       value={user.cinsiyet}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            ></TextField>
                        </ThemeProvider>

                        <ThemeProvider theme={disabledTheme}>
                            <TextField disabled
                                       label="E-posta"
                                       value={user.email}
                                       InputLabelProps={{
                                           shrink: true,
                                       }}
                            ></TextField>
                        </ThemeProvider>

                        <TextField
                            label="Kan Grubu"
                            value={user.kanGrubu}
                            onChange={(e) => setUser({ ...user, kanGrubu: e.target.value as KanGrubu})}
                            InputLabelProps={{
                                shrink: true,
                            }}>
                            {getEnumValues(KanGrubu).map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}</TextField>

                        <TextField
                            label="Araç Plakası"
                            value={user.aracPlakasi}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        ></TextField>

                        <TextField
                            label="Acil Durumda Ulaşılacak Kişi Tel"
                            value={user.acilDurumTelefon}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        ></TextField>

                    </Grid>

                    <Grid lg={12}>
                        <TextField fullWidth
                                   label="İkametgah Adresi"
                                   value={user.adres}
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
