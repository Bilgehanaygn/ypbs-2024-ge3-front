"use client";
import React, { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import axios from "axios";

function News() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("/api/news");
            setItems(response.data);
        }
        fetchData();
    }, []);

    return (
        <div
            style={{
                width: "40vw",   // 40% of viewport width
                height: "40vh",  // 40% of viewport height
                position: "relative",
                padding: 0,
                margin: 0,
            }}>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    background:
                        "linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))",
                    padding: "0px",
                    zIndex: 50,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    margin: 0,
                }}>
                <NewspaperIcon
                    style={{ fontSize: "1.5vw", color: "white", marginRight: "0.5vw" }}
                />
                <h2 style={{ color: "white", margin: 0, fontSize: "1.5vw" }}>Haberler</h2>
            </div>
            <Carousel
                autoPlay={false}
                animation="slide"
                indicators={true}
                navButtonsAlwaysInvisible={false}
                indicatorIconButtonProps={{
                    style: {
                        padding: "0.25vw",
                        width: 0,
                        height: 0,
                        color: "black",
                        borderWidth: "0.15vw",
                        borderColor: "white",
                        borderStyle: "solid",
                        backgroundColor: "black",
                        margin: "0.25vw",
                    },
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        width: "0.75vw",
                        height: "0.75vw",
                        color: "white",
                        backgroundColor: "white",
                    },
                }}
                indicatorContainerProps={{
                    style: {
                        position: "relative",
                        bottom: "2vh",
                        zIndex: 1,
                        display: "flex",
                        justifyContent: "center",
                        margin: 0,
                        padding: 0,
                    },
                }}
                navButtonsProps={{
                    style: {
                        padding: 0,
                        opacity: 0.5,
                    },
                }}
                navButtonsWrapperProps={{
                    style: {
                        top: "50%",
                        transform: "translateY(-50%)",
                        justifyContent: "space-between",
                        width: "2.5vw",
                        position: "absolute",
                        margin: 0,
                        padding: 0,
                    },
                }}>
                {items.map((item, i) => (
                    <Item key={i} item={item} />
                ))}
            </Carousel>
        </div>
    );
}

function Item(props) {
    return (
        <Paper
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                margin: 0,
                padding: 0,
            }}>
            <img
                src={props.item.backgroundImage}
                style={{ width: "100%", height: "100%", objectFit: "fill" }}
                alt={props.item.header}
            />
            <div
                style={{
                    zIndex: 1,
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "white",
                    textAlign: "center",
                    padding: "0.5vw",
                    fontSize: "1vw",
                    margin: 0,
                }}>
                <p style={{ margin: 0 }}>{props.item.content}</p>
            </div>
        </Paper>
    );
}

export default News;