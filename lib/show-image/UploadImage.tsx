import React, { useState, useEffect } from "react";
import { Fab, Card } from "@mui/material";
import { AddPhotoAlternate, UploadFile } from "@mui/icons-material";
import classes from "./Styles.module.css";


interface Image {
    id: string;
    name: string;
    data: string;
}

function UploadImage() {
    const [image, setImage] = useState<File | null>(null);
    const [images, setImages] = useState<Image[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setImage(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!image) {
            setError("No image selected");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);


            const response = await fetch("/api/images", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Upload successful:", data);
                setImage(null);
                setError(null);
            } else {
                throw new Error("Upload failed");
            }

    };

    return (
        <div>
            <Card className={classes.card}>
                <input
                    className={classes.input}
                    accept="image/*"
                    id="contained-button-file"
                    type="file"
                    onChange={handleImage}
                />
                <label htmlFor="contained-button-file">
                    <Fab
                        variant="extended"
                        size="large"
                        color="primary"
                        component="span"
                        style={{ position: "absolute", top: 100, left: 600 }}
                    >
                        <AddPhotoAlternate sx={{ mr: 1 }} />
                        Dosya Seç
                    </Fab>
                </label>

                <Fab
                    variant="extended"
                    size="large"
                    color="primary"
                    onClick={handleUpload}
                    style={{ position: "absolute", top: 100, left: 850 }}
                >
                    <UploadFile sx={{ mr: 1 }} />
                    Dosya Yükle
                </Fab>
            </Card>

            {error && <p className={classes.error}>{error}</p>}

            <div className={classes.imageContainer}>
                {images.map((img) => (
                    <img
                        key={img.id}
                        src={`data:image/jpeg;base64,${img.data}`}
                        alt={img.name}
                        className={classes.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default UploadImage;
