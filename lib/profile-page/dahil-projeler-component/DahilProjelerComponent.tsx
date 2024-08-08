import React, {useEffect} from "react";
import axios from "axios";
import {Box, Card, Divider, Grid, Typography} from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";

interface projeInterface {
    id?: number;
    projeAdi: string;
    takim: string;
    gorev: string;
    baslangicTarihi: string;
    bitisTarihi: string;
}

export default function DahilProjelerComponent() {

    const [projectsOfUser, setProjectsOfUser] = React.useState<projeInterface[]>([]);

    async function fetchData() {
        const response = await axios.get<projeInterface[]>("api/proje")
        setProjectsOfUser(response.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Card>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" justifyContent="left" p={2}>
                    <ContactsIcon color="inherit" fontSize="small"/>
                    <Typography variant="subtitle1" color="black" ml={1} fontSize="small">DAHİL OLUNAN PROJELER</Typography>
                </Box>
            </Box>

            <Grid container spacing={2} p={2} alignItems={"center"} justifyContent="space-between">
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Proje Adı</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Takım</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Görev</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Başlangıç Tarihi</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Bitiş Tarihi</Typography>
                </Grid>
            </Grid>

            <Divider orientation="horizontal" flexItem style={{backgroundColor: "lightgrey"}}/>

            {projectsOfUser.map((proje, index) => (
                <Grid container spacing={2} p={2} key={index} alignItems={"center"} justifyContent="space-between">
                    <Grid item xs={12} sm={2}>
                        <Typography variant="body1" color="black" fontSize="small"
                                    noWrap>{proje.projeAdi}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Typography variant="body1" color="black" fontSize="small"
                                    noWrap>{proje.takim}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        <Typography variant="body1" color="black" fontSize="small"
                                    noWrap>{proje.gorev}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>

                        <Typography variant="body1" color="black" fontSize="small"
                                    noWrap>{proje.baslangicTarihi}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>

                        <Typography variant="body1" color="black" fontSize="small"
                                    noWrap>{proje.bitisTarihi}</Typography>
                    </Grid>

                </Grid>
            ))}
        </Card>
    );
}