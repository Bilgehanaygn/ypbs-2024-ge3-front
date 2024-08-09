import {Box, Button, Card, Divider, Grid, IconButton, TextField, Typography} from "@mui/material";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ContactsIcon from '@mui/icons-material/Contacts';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect} from "react";
import axios from "axios";
import CustomSelect from "@/lib/common-component/custom-select/CustomSelect";

interface egitimInterface {
    id?: number;
    egitimTuru: string;
    okulAdi: string;
    bolum: string;
    baslangicTarihi: string;
    mezuniyetTarihi: string;
    aciklama: string;
}

export default function EgitimComponent() {
    const [egitimsOfUser, setEgitimsOfUser] = React.useState<egitimInterface[]>([]);
    const [editIndex, setEditIndex] = React.useState<number | null>(null);
    const [editData, setEditData] = React.useState<egitimInterface | null>(null);

    const fetchData = async () => {
        const response = await axios.get<egitimInterface[]>("api/egitim");
        setEgitimsOfUser(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function handleDelete(index: number) {

        const sendData = async () => {
            await axios.delete("api/egitim/" + egitimsOfUser[index].id);
        };

        await sendData();
        await fetchData();
    }

    function handleEdit(index: number) {
        setEditIndex(index);
        setEditData(egitimsOfUser[index]);
    }

    function handleInputChange(e: { target: { name: string; value: string } }) {
        if (editData) {
            const {name, value} = e.target as HTMLInputElement;
            setEditData({...editData, [name]: value});
        }
    }

    function handleDateChange(name: string, value: Dayjs | null) {
        if (editData && value) {
            setEditData({...editData, [name]: value.format('YYYY-MM-DD')});
        }
    }

    function handleClose() {
        setEditIndex(null);
        setEditData(null);
    }

    async function handleSave() {
        if (editIndex !== null && editData) {

            if (editData.id) {
                await axios.put<egitimInterface>("api/egitim/" + editData.id, editData);
            } else {
                const response = await axios.post<egitimInterface>("api/egitim", editData);
            }
            setEditIndex(null);
            setEditData(null);

            fetchData();
        }
    }

    function handleAdd() {
        const newEgitim: egitimInterface = {
            egitimTuru: "",
            okulAdi: "",
            bolum: "",
            baslangicTarihi: "",
            mezuniyetTarihi: "",
            aciklama: ""
        };

        setEgitimsOfUser([newEgitim, ...egitimsOfUser]);
        setEditIndex(0);
        setEditData(newEgitim);
    }

    //TODO: Daha kolay okunabilirlik için "Row" "Column" "Headers" vb. component'lara ayır
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Card>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" justifyContent="left" p={2}>
                        <ContactsIcon color="inherit" fontSize="small"/>
                        <Typography variant="subtitle1" color="black" ml={1} fontSize="small">EĞİTİM</Typography>
                    </Box>
                    <Button
                        size="small"
                        onClick={() => handleAdd()}
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

                <Grid container spacing={2} p={2} alignItems={"flex-end"} justifyContent="space-between">
                    <Grid item xs={12} sm={2}>
                        <Typography variant="caption" color="black" fontSize="small" noWrap>Eğitim Türü</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="caption" color="black" fontSize="small" noWrap>Üniversite/Okul</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="caption" color="black" fontSize="small" noWrap>Bölüm</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="caption" color="black" fontSize="small" noWrap>Başlangıç Tarihi</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="caption" color="black" fontSize="small" noWrap>Mezuniyet Tarihi</Typography>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                        <Typography variant="caption" color="black" fontSize="small" noWrap>Açıklama</Typography>
                    </Grid>
                </Grid>

                <Divider orientation="horizontal" flexItem style={{backgroundColor: "lightgrey"}}/>

                {egitimsOfUser.map((user, index) => (
                    <Grid container spacing={2} p={2} key={index} alignItems={"flex-end"} justifyContent="space-between">
                        <Grid item xs={12} sm={2}>
                            {editIndex === index ? (
                                <CustomSelect
                                    fetchEndpoint="api/egitim/enum"
                                    selectedValue={editData?.egitimTuru || ""}
                                    onChange={(e) => handleInputChange({
                                        target: {
                                            name: 'egitimTuru',
                                            value: e.target.value
                                        }
                                    })}
                                />
                            ) : (
                                <Typography variant="body1" color="black" fontSize="small"
                                            noWrap>{user.egitimTuru}</Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            {editIndex === index ? (
                                <TextField
                                    required
                                    error={!editData?.okulAdi}
                                    placeholder="Gerekli Alan"
                                    name="okulAdi"
                                    value={editData?.okulAdi}
                                    onChange={handleInputChange}
                                    variant="standard"
                                    size="small"
                                    sx={{
                                        maxWidth: "150px",
                                        "& .MuiInputBase-root": {
                                            height: "20px",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "0px 0px 5px 0px",
                                            color: "black",
                                            fontSize: "0.81rem",
                                            "&::placeholder": {
                                                color: "red",
                                            }
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
                                    required
                                    error={!editData?.bolum}
                                    placeholder={!editData?.bolum ? "Required Field" : ""}
                                    name="bolum"
                                    value={editData?.bolum}
                                    onChange={handleInputChange}
                                    variant="standard"
                                    size="small"
                                    sx={{
                                        maxWidth: "150px",
                                        "& .MuiInputBase-root": {
                                            height: "20px",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "0px 0px 5px 0px",
                                            color: "black",
                                            fontSize: "0.81rem",
                                            "&::placeholder": {
                                                color: "red",
                                            }
                                        }
                                    }}
                                />
                            ) : (
                                <Typography variant="body1" color="black" fontSize="small"
                                            noWrap>{user.bolum}</Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            {editIndex === index ? (
                                <DatePicker
                                    value={editData?.baslangicTarihi ? dayjs(editData.baslangicTarihi) : null}
                                    onChange={(newValue) => handleDateChange('baslangicTarihi', newValue)}

                                    //Normally TextField etc all MUI materials have variant="standard" but mui x materials doesn't have it. Tried to match in visuals
                                    sx={{
                                        maxWidth: "150px",
                                        '& .MuiInputBase-root': {
                                            height: '20px',
                                            fontSize: '0.81rem',
                                            '& .MuiInputBase-input': {
                                                padding: '0px',
                                                color: 'black',
                                                borderBottom: '1px solid black',
                                                '&:hover': {
                                                    borderBottom: '2px solid darkred',
                                                },
                                            },
                                            '&:before, &:after': {
                                                borderBottom: 'none',
                                            },
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                            '&:hover fieldset': {
                                                border: 'none',
                                            },
                                            '&.Mui-focused fieldset': {
                                                border: 'none',
                                            },
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '1rem',
                                        },
                                    }}
                                />
                            ) : (
                                <Typography variant="body1" color="black" fontSize="small"
                                            noWrap>{user.baslangicTarihi}</Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            {editIndex === index ? (
                                <DatePicker
                                    value={editData?.mezuniyetTarihi ? dayjs(editData.mezuniyetTarihi) : null}
                                    onChange={(newValue) => handleDateChange('mezuniyetTarihi', newValue)}
                                    sx={{
                                        maxWidth: "150px",
                                        '& .MuiInputBase-root': {
                                            height: '20px',
                                            fontSize: '0.81rem',
                                            '& .MuiInputBase-input': {
                                                padding: '0px',
                                                color: 'black',
                                                borderBottom: '1px solid black',
                                                '&:hover': {
                                                    borderBottom: '2px solid darkred',
                                                },
                                            },
                                            '&:before, &:after': {
                                                borderBottom: 'none',
                                            },
                                        },
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                border: 'none',
                                            },
                                            '&:hover fieldset': {
                                                border: 'none',
                                            },
                                            '&.Mui-focused fieldset': {
                                                border: 'none',
                                            },
                                        },
                                        '& .MuiSvgIcon-root': {
                                            fontSize: '1rem',
                                        },
                                    }}
                                />
                            ) : (
                                <Typography variant="body1" color="black" fontSize="small"
                                            noWrap>{user.mezuniyetTarihi}</Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            <Box display="flex" alignItems="flex-end" justifyContent="space-between"
                                 sx={{padding: "0px 0px"}}>
                                {editIndex === index ? (
                                    <TextField
                                        required
                                        error={!editData?.aciklama}
                                        placeholder={!editData?.aciklama ? "Required Field" : ""}
                                        name="aciklama"
                                        value={editData?.aciklama}
                                        onChange={handleInputChange}
                                        variant="standard"
                                        size="small"
                                        sx={{
                                            maxWidth: "150px",
                                            "& .MuiInputBase-root": {
                                                height: "20px",
                                            },
                                            "& .MuiInputBase-input": {
                                                padding: "0px 0px 5px 0px",
                                                color: "black",
                                                fontSize: "0.81rem",
                                                "&::placeholder": {
                                                    color: "red",
                                                }
                                            }
                                        }}
                                    />
                                ) : (
                                    <Typography variant="body1" color="black"
                                                fontSize="small" noWrap>{user.aciklama}</Typography>
                                )}
                                <Box display="flex" justifyItems={"flex-end"} alignItems={"flex-end"} gap={1}>
                                    {editIndex === index ? (
                                        <>

                                            <IconButton
                                                size="small"
                                                onClick={handleClose}
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
                                                <CloseIcon fontSize="small"/>
                                            </IconButton>


                                            <IconButton
                                                size="small"
                                                onClick={handleSave}
                                                disabled={!(editData.okulAdi && editData.egitimTuru && editData.aciklama && editData.bolum && editData.baslangicTarihi && editData.mezuniyetTarihi)}
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
                                        </>

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
            </Card>
        </LocalizationProvider>
    );
}
