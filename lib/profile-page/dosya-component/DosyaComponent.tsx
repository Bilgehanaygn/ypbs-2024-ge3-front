import {
    Box,
    Button,
    Card,
    Divider,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    TextField,
    Typography
} from "@mui/material";
import CustomSelect from "@/lib/common-component/custom-select/CustomSelect";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContactsIcon from '@mui/icons-material/Contacts';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import React, {useEffect} from "react";
import dayjs from 'dayjs';
import axios from "axios";


interface dosyaInterface {
    id?: number;
    dosyaTuru: string;
    dosyaAdi: string;
    dosyaUzantisi?: string; //Backend'de dosyaUzantisi diye bir şey yok. Front'da kullanıcı dosya yüklerken, "Dosya Adı" girme yerinde dosya uzantısını manuel değiştiremesin diye eklendi.
    yuklenmeTarihi: string;
    aciklama: string;
}


//TODO: Çok uzun componentlere ayırıp sadeleştir
export default function DosyaComponent() {

    const [dosyaOfUser, setDosyaOfUser] = React.useState<dosyaInterface[]>([]);
    const [editIndex, setEditIndex] = React.useState<number | null>(null);
    const [editData, setEditData] = React.useState<dosyaInterface | null>(null);
    const [file, setFile] = React.useState<File | null>(null);

    const fetchData = async () => {
        const response = await axios.get<dosyaInterface[]>("api/dosya");
        setDosyaOfUser(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    async function handleDelete(index: number) { //TODO: Bura oke

        const sendData = async () => {
            await axios.delete("api/dosya/" + dosyaOfUser[index].id);
        };

        await sendData();
        await fetchData();
    }

    function handleDownload(index: number) {
        const fetchData = async () => {
            const response = await axios.get("api/dosya/download/" + dosyaOfUser[index].id, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', dosyaOfUser[index].dosyaAdi);
            document.body.appendChild(link);
            link.click();

            link.parentNode?.removeChild(link);
        }

        fetchData();
    }

    function handleInputChange(e: { target: { name: string; value: string } }) {
        if (editData) {
            const {name, value} = e.target as HTMLInputElement;
            setEditData({...editData, [name]: value});
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

            formData.append("dosyaTuru", editData.dosyaTuru);
            formData.append("dosyaAdi", editData.dosyaAdi + editData.dosyaUzantisi);
            formData.append("aciklama", editData.aciklama);
            formData.append("dosya", file);


            const response = await axios.post("api/dosya/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setEditIndex(null);
            setEditData(null);
            setFile(null);
            fetchData();
        }
    }


    function handleAdd() {
        const newDosya: dosyaInterface = {
            dosyaTuru: "",
            dosyaAdi: "",
            dosyaUzantisi: "",
            aciklama: "",
            yuklenmeTarihi: "",
        };

        setDosyaOfUser([newDosya, ...dosyaOfUser]);
        setFile(null);
        setEditIndex(0);
        setEditData(newDosya);
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
                setEditData({...editData, dosyaAdi: name, dosyaUzantisi: (extension ? ("." + extension) : "")});
            }
        }
    }


    return (
        <Card>
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="center" justifyContent="left" p={2}>
                    <ContactsIcon color="inherit" fontSize="small"/>
                    <Typography variant="subtitle1" color="black" ml={1} fontSize="small">Dosyalar</Typography>
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

            {<Grid container spacing={2} p={2} alignItems={"flex-end"} justifyContent="space-between">
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Dosya Türü</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Dosya Adı</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Yüklenme Tarihi</Typography>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Typography variant="caption" color="black" fontSize="small" noWrap>Açıklama</Typography>
                </Grid>
            </Grid>}

            <Divider orientation="horizontal" flexItem style={{backgroundColor: "lightgrey"}}/>

            {dosyaOfUser.map((user, index) => (
                <Grid container spacing={2} p={2} key={index} alignItems={"flex-end"} justifyContent="space-between">
                    <Grid item xs={12} sm={2}>
                        {editIndex === index ? (
                            <CustomSelect
                                fetchEndpoint="api/dosya/enum"
                                selectedValue={editData?.dosyaTuru || ""}
                                onChange={(e) => handleInputChange({
                                    target: {
                                        name: 'dosyaTuru',
                                        value: e.target.value
                                    }
                                })}
                            />
                        ) : (
                            <Typography variant="body1" color="black" fontSize="small"
                                        noWrap>{user.dosyaTuru}</Typography>
                        )}
                    </Grid>

                    <Grid item xs={12} sm={2} width={"200px"}>
                        {editIndex === index ? (
                            <Box display="flex" alignItems="flex-end" justifyContent="space-between">
                                <TextField
                                    required
                                    error={!editData?.dosyaAdi}
                                    placeholder={!editData?.dosyaAdi ? "Required Field" : ""}
                                    name="dosyaAdi"
                                    value={editData?.dosyaAdi || ""}
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
                                        noWrap>{user.dosyaAdi}</Typography>
                        )}
                    </Grid>


                    <Grid item xs={12} sm={2}>
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
                    </Grid>


                    <Grid item xs={12} sm={2}>

                        <Box display="flex" alignItems="flex-end" justifyContent="space-between"
                             justifyItems={"flex-end"} sx={{padding: "0px 0px"}}>

                            <Box sx={{maxWidth: "auto"}}>
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
                                                >{user.aciklama}</Typography>
                                )}
                            </Box>

                            <Box display="flex" alignItems="flex-end" justifyContent="flex-end"
                                 justifyItems={"flex-end"} sx={{padding: "0px 0px"}}>

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
                                            onClick={() => handleDownload(index)}
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
                                            <SaveAltIcon fontSize="small"/>
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
