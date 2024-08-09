import {Box, Button, Card, Divider, Grid, IconButton, Input, InputAdornment, TextField, Typography} from "@mui/material";
import CustomSelect from "@/lib/common-component/custom-select/CustomSelect";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ContactsIcon from '@mui/icons-material/Contacts';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';

import React, {useEffect} from "react";
import dayjs, {Dayjs} from 'dayjs';
import axios from "axios";

interface deneyimInterface {
    id?: number;
    etkinlikTuru: string;
    aciklama: string;
    link: string;
    ekAdi: string;
    ekUzantisi?: string
    yuklenmeTarihi: string;
}

export default function KatkiComponent() {
    const [katkiOfUser, setKatkiOfUser] = React.useState<deneyimInterface[]>([]);
    const [editIndex, setEditIndex] = React.useState<number | null>(null);
    const [editData, setEditData] = React.useState<deneyimInterface | null>(null);
    const [file, setFile] = React.useState<File | null>(null);


    const fetchData = async () => {
        const response = await axios.get<deneyimInterface[]>("api/katki");
        setKatkiOfUser(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function handleDelete(index: number) {

        const sendData = async () => {
            await axios.delete("api/katki/" + katkiOfUser[index].id);
        };

        await sendData();
        await fetchData();
    }

    function handleEdit(index: number) {
        setEditIndex(index);
        const selectedData = katkiOfUser[index];
        setEditData({...selectedData, ekAdi: "", ekUzantisi: ""});
        setFile(null);
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

            const formData = new FormData();

            formData.append("etkinlikTuru", editData.etkinlikTuru);
            formData.append("aciklama", editData.aciklama);
            formData.append("link", editData.link);
            formData.append("ekAdi", editData.ekAdi + editData.ekUzantisi);
            formData.append("ek", file);


            // debugger


            if (editData.id) {
                const response = await axios.put("api/katki/upload/" + editData.id, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            } else {
                const response = await axios.post("api/katki/upload", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }
            setEditIndex(null);
            setEditData(null);
            setFile(null);
            fetchData();
        }
    }

    function handleAdd() {
        const newKatki: deneyimInterface = {
            etkinlikTuru: "",
            aciklama: "",
            link: "",
            ekAdi: "",
            ekUzantisi: "",
            yuklenmeTarihi: "",
        };

        setKatkiOfUser([newKatki, ...katkiOfUser]);
        setFile(null);
        setEditIndex(0);
        setEditData(newKatki);
    }


    function handleDownload(index: number) {
        const fetchData = async () => {
            const response = await axios.get("api/katki/download/" + katkiOfUser[index].id, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', katkiOfUser[index].ekAdi);
            document.body.appendChild(link);
            link.click();

            link.parentNode?.removeChild(link);
        }

        fetchData();
    }

    function triggerFileInput() {
        document.getElementById('fileInput')?.click();
    }


    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];
            setFile(selectedFile);

            const fileParts = selectedFile.name.split(".");
            const extension = fileParts.pop();
            const name = fileParts.join(".");

            if (editData) {
                setEditData({...editData, ekAdi: name, ekUzantisi: (extension ? ("." + extension) : "")});
            }
        }
    }


    return (

        <Card>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" justifyContent="left" p={2}>
                    <ContactsIcon color="inherit" fontSize="small"/>
                    <Typography variant="subtitle1" color="black" ml={1} fontSize="small">KATKI</Typography>
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
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Etkinlik Türü</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Açıklama</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Ek</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Link</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Yüklenme Tarihi</Typography>
                </Grid>
            </Grid>

            <Divider orientation="horizontal" flexItem style={{backgroundColor: "lightgrey"}}/>

            {katkiOfUser.map((user, index) => (
                <Grid container spacing={2} p={2} key={index} alignItems={"flex-end"} justifyContent="space-between">
                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (
                            <CustomSelect
                                fetchEndpoint="api/katki/enum"
                                selectedValue={editData?.etkinlikTuru || ""}
                                onChange={(e) => handleInputChange({
                                    target: {
                                        name: 'etkinlikTuru',
                                        value: e.target.value
                                    }
                                })}
                            />
                        ) : (
                            <Typography variant="body1" color="black" fontSize="small"
                                        noWrap>{user.etkinlikTuru}</Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={2}>
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
                            <Typography variant="body1" color="black" fontSize="small"
                                        noWrap>{user.aciklama}</Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={2} width={"200px"}>
                        {editIndex === index ? (
                            <Box display="flex" alignItems="flex-end" justifyContent="space-between">
                                <TextField
                                    required
                                    error={!editData?.ekAdi}
                                    placeholder="Required Field"
                                    name="ekAdi"
                                    value={editData?.ekAdi || ""}
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
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton
                                                    size="small"
                                                    onClick={triggerFileInput}
                                                    sx={{
                                                        padding: "0px 0px 5px 0px",
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
                                                    <AttachFileIcon fontSize={"small"}/>
                                                </IconButton>
                                                <Input
                                                    id="fileInput"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    sx={{display: 'none'}}
                                                />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>
                        ) : (
                            <Typography variant="body1" color="black" fontSize="small"
                                        noWrap>{user.ekAdi}</Typography>
                        )}
                    </Grid>



                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (
                            <TextField
                                required
                                error={!editData?.link || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(editData.link)}
                                helperText={(!/^https?:\/\/[^\s$.?#].[^\s]*$/.test(editData.link) ? "Invalid URL format" : "")}
                                placeholder="Required Field"
                                name="link"
                                type="url"
                                value={editData?.link}
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
                            <Typography
                                variant="body1"
                                color="black"
                                fontSize="small"
                                noWrap
                                component="a"
                                href={user.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'underline',
                                    }
                                }}
                            >
                                {user.link}
                            </Typography>
                        )}
                    </Grid>


                    <Grid item xs={12} sm={2}>
                        <Box display="flex" alignItems="flex-end" justifyContent="space-between"
                             sx={{padding: "0px 0px"}}>
                            {editIndex === index ? (
                                <TextField
                                    value={dayjs().format('YYYY-MM-DD')}
                                    variant="standard"
                                    size="small"
                                    sx={{
                                        maxWidth: "150px",
                                        "& .MuiInputBase-root": {
                                            height: "20px",
                                        },
                                        "& .MuiInputBase-input": {
                                            padding: "0px",
                                            color: "black",
                                            fontSize: "0.81rem",
                                            "&::placeholder": {
                                                color: "red",
                                            }
                                        }
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            ) : (
                                <Typography variant="body1" color="black" fontSize="small" noWrap>
                                    {user.yuklenmeTarihi}
                                </Typography>
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
                                            disabled={!(editData.ekAdi && editData.etkinlikTuru && editData.aciklama && editData.link)}
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
