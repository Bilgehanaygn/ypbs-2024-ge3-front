import {Box, Button, Card, Divider, Grid, IconButton, TextField, Typography} from "@mui/material";
import ContactsIcon from '@mui/icons-material/Contacts';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import React, {useEffect} from "react";
import axios from "axios";
import CustomSelect from "@/lib/custom-select/CustomSelect";

interface egitimInterface {
    id: number
    egitimTuru: string,
    okulAdi: string,
    bolum: string,
    baslangicTarihi: string,
    mezuniyetTarihi: string,
    aciklama: string
}

// const egitimArray = [
//     {
//         egitimTuru: "Doktora",
//         okulAdi: "Hacettepe Üniversitesi",
//         bolum: "Yazılım Mühendisliği",
//         baslangicTarihi: "12.09.2020",
//         mezuniyetTarihi: "12.09.2024",
//         aciklama: "Mikro Servisler"
//     },
//     {
//         egitimTuru: "Lisans",
//         okulAdi: "Hacettepe Üniversitesi",
//         bolum: "Yazılım Mühendisliği",
//         baslangicTarihi: "12.01.2023",
//         mezuniyetTarihi: "Devam Ediyor",
//         aciklama: "Bilgisayar Bilimleri"
//     },
//     {
//         egitimTuru: "Lisans",
//         okulAdi: "Hacettepe Üniversitesi",
//         bolum: "Yazılım Mühendisliği",
//         baslangicTarihi: "12.01.2023",
//         mezuniyetTarihi: "Devam Ediyor",
//         aciklama: "Bilgisayar Bilimleri"
//     },
//     {
//         egitimTuru: "Lisans",
//         okulAdi: "Hacettepe Üniversitesi",
//         bolum: "Yazılım Mühendisliği",
//         baslangicTarihi: "12.01.2023",
//         mezuniyetTarihi: "Devam Ediyor",
//         aciklama: "Bilgisayar Bilimleri"
//     }
// ];


export default function EgitimPage() {
    const [egitimsOfUser, setEgitimsOfUser] = React.useState<egitimInterface[]>([]);
    const [errorMessage, setErrorMessage] = React.useState<string>("");
    const [editIndex, setEditIndex] = React.useState<number | null>(null);
    const [editData, setEditData] = React.useState<egitimInterface | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<egitimInterface[]>("api/egitim")
                setEgitimsOfUser(response.data);
            } catch (error) {
                setErrorMessage("Error: " + error.message);
                console.log(errorMessage);
            }
        }
        fetchData();
    }, [])

    function handleDelete(index: number) {

        const newUsers = [...egitimsOfUser];
        newUsers.splice(index, 1);
        setEgitimsOfUser(newUsers);

        const sendData = async () => {
            try {
                const response = await axios.delete("api/egitim/" + egitimsOfUser[index].id)
            } catch (error) {
                setErrorMessage("Error: " + error.message); //TODO: toastify ile error at
                console.log(errorMessage);
            }
        }

        sendData();
    }

    function handleEdit(index: number) {
        setEditIndex(index);
        setEditData(egitimsOfUser[index]);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (editData) {
            setEditData({...editData, [e.target.name]: e.target.value});
        }
    }

    function handleSave() {
        if (editIndex !== null && editData) {

            const newUsers = [...egitimsOfUser];
            newUsers[editIndex] = editData;
            setEgitimsOfUser(newUsers);

            const sendData = async () => {
                try {
                    const response = await axios.put<egitimInterface[]>("api/egitim/" + editData.id, editData)
                } catch (error) {
                    setErrorMessage("Error: " + error.message); //TODO: toastify ile error at
                    console.log(errorMessage);
                }
            }
            sendData();

            setEditIndex(null);
            setEditData(null);
        }
    }


    //TODO: Componentlara ayrılabilir "Row" "Heading" "DataField" gibi ya da MUI DataGrid bekle
    return (
        <Card>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" justifyContent="left" p={2}>
                    <ContactsIcon color="inherit" fontSize="small"/>
                    <Typography variant="subtitle1" color="black" ml={1} fontSize="small">EĞİTİM</Typography>
                </Box>
                <Button //TODO: Serdar'a sorarak buttonların textfieldların vs görünümünü theme'ya ekle
                    size="small"
                    sx={{
                        backgroundColor: "#2e7d32",
                        color: "white",
                        padding: "2px 5px",
                        minHeight: "24px",
                        fontSize: "0.75rem",
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.78,
                        justifyContent: 'flex-start',
                        '&:hover': {
                            backgroundColor: "darkgreen",
                        }
                    }}
                >
                    <AddIcon fontSize="small" sx={{fontSize: "1rem"}}/>
                    EKLE
                </Button>
            </Box>

            <Grid container spacing={2} p={2}>
                <Grid item xs={12} sm={2}>
                    <Typography variant="body1" color="black" fontSize="small" noWrap>Eğitim Türü</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="body1" color="black" fontSize="small" noWrap>Üniversite/Okul</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="body1" color="black" fontSize="small" noWrap>Bölüm</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="body1" color="black" fontSize="small" noWrap>Başlangıç Tarihi</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="body1" color="black" fontSize="small" noWrap>Mezuniyet Tarihi</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="body1" color="black" fontSize="small" noWrap>Açıklama</Typography>
                </Grid>
            </Grid>

            <Divider orientation="horizontal" flexItem style={{backgroundColor: "lightgrey"}}/>

            {egitimsOfUser.map((user, index) => (
                <Grid container spacing={2} p={2} key={index}>
                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (//TODO: TesxtField yerine drop down menu olara bütün enumları göster
                            // <TextField
                            //     name="egitimTuru"
                            //     value={editData?.egitimTuru}
                            //     onChange={handleInputChange}
                            //     variant="standard"
                            //     size={"small"}
                            //     sx={{
                            //         maxWidth: "150px",
                            //         "& .MuiInputBase-root": {
                            //             height: "20px",
                            //         },
                            //         "& .MuiInputBase-input": {
                            //             padding: "0px",
                            //             color: "black",
                            //             fontSize: "0.81rem"
                            //         }
                            //     }}
                            // />
                            <CustomSelect fetchEndpoint={"api/egitim/enum"} selectedValue={editData?.egitimTuru} customLabel={"Eğitim Türü"} />
                        ) : (<Typography variant="body1" color="black" fontSize="small"
                                         noWrap>{user.egitimTuru}</Typography>)}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (
                            <TextField
                                name="okulAdi"
                                value={editData?.okulAdi}
                                onChange={handleInputChange}
                                variant="standard"
                                size={"small"}
                                sx={{
                                    maxWidth: "150px",
                                    "& .MuiInputBase-root": {
                                        height: "20px",
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "0px",
                                        color: "black",
                                        fontSize: "0.81rem"
                                    }
                                }}
                            />
                        ) : (
                            <Typography variant="body1" color="black" fontSize="small"
                                        noWrap>{user.okulAdi}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (
                            <TextField
                                name="bolum"
                                value={editData?.bolum}
                                onChange={handleInputChange}
                                variant="standard"
                                size={"small"}
                                sx={{
                                    maxWidth: "150px",
                                    "& .MuiInputBase-root": {
                                        height: "20px",
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "0px",
                                        color: "black",
                                        fontSize: "0.81rem"
                                    }
                                }}
                            />
                        ) : (
                            <Typography variant="body1" color="black" fontSize="small" noWrap>{user.bolum}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (//TODO: TArihler için ya Takvim aç seçtir ya da TexTfield'a error ekle düzgün formatta değilse hata versin
                            <TextField
                                name="baslangicTarihi"
                                value={editData?.baslangicTarihi}
                                onChange={handleInputChange}
                                variant="standard"
                                size={"small"}
                                sx={{
                                    maxWidth: "150px",
                                    "& .MuiInputBase-root": {
                                        height: "20px",
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "0px",
                                        color: "black",
                                        fontSize: "0.81rem"
                                    }
                                }}
                            />
                        ) : (
                            <Typography variant="body1" color="black" fontSize="small"
                                        noWrap>{user.baslangicTarihi}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (//TODO: Tarih
                            <TextField
                                name="mezuniyetTarihi"
                                value={editData?.mezuniyetTarihi}
                                onChange={handleInputChange}
                                variant="standard"
                                size={"small"}
                                sx={{
                                    maxWidth: "150px",
                                    "& .MuiInputBase-root": {
                                        height: "20px",
                                    },
                                    "& .MuiInputBase-input": {
                                        padding: "0px",
                                        color: "black",
                                        fontSize: "0.81rem"
                                    }
                                }}
                            />
                        ) : (
                            <Typography variant="body1" color="black" fontSize="small"
                                        noWrap>{user.mezuniyetTarihi}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            {editIndex === index ? (
                                <TextField
                                    name="aciklama"
                                    value={editData?.aciklama}
                                    onChange={handleInputChange}
                                    variant="standard"
                                    size={"small"}
                                    sx={{
                                        maxWidth: "125px",
                                        "& .MuiInputBase-root": {
                                            height: "20px",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "0px",
                                            color: "black",
                                            fontSize: "0.81rem"
                                        }
                                    }}
                                />
                            ) : (
                                <Typography variant="body1" color="black" fontSize="small">{user.aciklama}</Typography>
                            )}
                            <Box display="flex" gap={1}>
                                {editIndex === index ? (
                                    <IconButton
                                        size="small"
                                        onClick={handleSave}
                                        sx={{
                                            "&:hover": {
                                                bgcolor: "transparent",
                                                color: "darkred",
                                                "& .MuiSvgIcon-root": {
                                                    color: "#2e7d32",
                                                },
                                            },
                                            "&:active": {
                                                transform: "scale(0.95)",
                                            }
                                        }}
                                    >
                                        <SaveIcon fontSize="small"/>
                                    </IconButton>

                                ) : (
                                    <>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleDelete(index)}
                                            sx={{
                                                "&:hover": {
                                                    bgcolor: "transparent",
                                                    color: "red",
                                                    "& .MuiSvgIcon-root": {
                                                        color: "darkred",
                                                    },
                                                },
                                                "&:active": {
                                                    transform: "scale(0.95)",
                                                }
                                            }}
                                        >
                                            <DeleteOutlineIcon fontSize="small"/>
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => handleEdit(index)}
                                        >
                                            <EditIcon fontSize="small"/>
                                        </IconButton>
                                    </>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            ))}

            <br/>
            <br/>
            <br/>
            <br/>

        </Card>
    );
}