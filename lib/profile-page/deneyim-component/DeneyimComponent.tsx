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

interface deneyimInterface {
    id?: number;
    kurumAdi: string;
    pozisyon: string;
    calismaSekli: string;
    baslamaTarihi: string;
    bitisTarihi: string;
    istenAyrilmaNedeni: string;
}

export default function DeneyimComponent() {
    const [deneyimsOfUser, setDeneyimsOfUser] = React.useState<deneyimInterface[]>([]);
    const [editIndex, setEditIndex] = React.useState<number | null>(null);
    const [editData, setEditData] = React.useState<deneyimInterface | null>(null);

    const fetchData = async () => {
        const response = await axios.get<deneyimInterface[]>("api/deneyim");
        setDeneyimsOfUser(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function handleDelete(index: number) {

        const sendData = async () => {
            await axios.delete("api/deneyim/" + deneyimsOfUser[index].id);
        };

        await sendData();
        await fetchData();
    }

    function handleEdit(index: number) {
        setEditIndex(index);
        setEditData(deneyimsOfUser[index]);
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
        fetchData();
    }

    async function handleSave() {
        if (editIndex !== null && editData) {

            if (editData.id) {
                await axios.put<deneyimInterface>("api/deneyim/" + editData.id, editData);
            } else {
                const response = await axios.post<deneyimInterface>("api/deneyim", editData);
            }
            setEditIndex(null);
            setEditData(null);

            fetchData();
        }
    }

    function handleAdd() {
        const newDeneyim: deneyimInterface = {
            kurumAdi: "",
            pozisyon: "",
            calismaSekli: "",
            baslamaTarihi: "",
            bitisTarihi: "",
            istenAyrilmaNedeni: ""
        };

        setDeneyimsOfUser([newDeneyim, ...deneyimsOfUser]);
        setEditIndex(0);
        setEditData(newDeneyim);
    }


    return (

        <Card>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" justifyContent="left" p={2}>
                    <ContactsIcon color="inherit" fontSize="small"/>
                    <Typography variant="subtitle1" color="black" ml={1} fontSize="small">DENEYİM</Typography>
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
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Çalışma Şekli</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Çalıştığı Pozisyon</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Çalıştığı Kurum Adı</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>İşe Başlama Tarihi</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>İşten Çıkış Tarihi</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>İşten Ayrılış
                        Nedeni</Typography>
                </Grid>
            </Grid>

            <Divider orientation="horizontal" flexItem style={{backgroundColor: "lightgrey"}}/>

            {deneyimsOfUser.map((user, index) => (
                <Grid container spacing={2} p={2} key={index} alignItems={"flex-end"} justifyContent="space-between">
                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (
                            <CustomSelect
                                fetchEndpoint="api/deneyim/enum"
                                selectedValue={editData?.calismaSekli || ""}
                                onChange={(e) => handleInputChange({
                                    target: {
                                        name: 'calismaSekli',
                                        value: e.target.value
                                    }
                                })}
                            />
                        ) : (
                            <Typography variant="body1" color="black" fontSize="small"
                                        noWrap>{user.calismaSekli}</Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (
                            <TextField
                                required
                                error={!editData?.kurumAdi}
                                placeholder={!editData?.kurumAdi ? "Required Field" : ""}
                                name="kurumAdi"
                                value={editData?.kurumAdi}
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
                                        noWrap>{user.kurumAdi}</Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (
                            <TextField
                                required
                                error={!editData?.pozisyon}
                                placeholder={!editData?.pozisyon ? "Required Field" : ""}
                                name="pozisyon"
                                value={editData?.pozisyon}
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
                                        noWrap>{user.pozisyon}</Typography>
                        )}
                    </Grid>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Grid item xs={12} sm={2}>
                            {editIndex === index ? (
                                <DatePicker
                                    value={editData?.baslamaTarihi ? dayjs(editData.baslamaTarihi) : null}
                                    onChange={(newValue) => handleDateChange('baslamaTarihi', newValue)}

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
                                            noWrap>{user.baslamaTarihi}</Typography>
                            )}
                        </Grid>

                        <Grid item xs={12} sm={2}>
                            {editIndex === index ? (
                                <DatePicker
                                    value={editData?.bitisTarihi ? dayjs(editData.bitisTarihi) : null}
                                    onChange={(newValue) => handleDateChange('bitisTarihi', newValue)}
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
                                            noWrap>{user.bitisTarihi}</Typography>
                            )}
                        </Grid>
                    </LocalizationProvider>

                    <Grid item xs={12} sm={2}>
                        <Box display="flex" alignItems="flex-end" justifyContent="space-between"
                             sx={{padding: "0px 0px"}}>
                            {editIndex === index ? (
                                <TextField
                                    required
                                    error={!editData?.istenAyrilmaNedeni}
                                    placeholder={!editData?.istenAyrilmaNedeni ? "Required Field" : ""}
                                    name="istenAyrilmaNedeni"
                                    value={editData?.istenAyrilmaNedeni}
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
                                            fontSize="small" noWrap>{user.istenAyrilmaNedeni}</Typography>
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

    );
}
