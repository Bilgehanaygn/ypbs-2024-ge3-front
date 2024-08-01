'use client';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import axios from 'axios';

function News() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/api/news'); // Make sure this endpoint returns the correct structure
                setItems(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{
            width: 800,
            height: 400,
            marginLeft: 200,
        }}>
            <Carousel
                autoPlay={false}
                animation="slide"
                indicators={true}
                navButtonsAlwaysInvisible={false}
                indicatorIconButtonProps={{
                    style: {
                        padding: 4,
                        width: 3,
                        height: 3,
                        color: 'black',
                        borderWidth: '3px',
                        borderColor: 'white',
                        borderStyle: 'solid',
                        backgroundColor: 'black',
                        margin: '4px',
                    }
                }}
                activeIndicatorIconButtonProps={{
                    style: {
                        width: 16,
                        height: 16,
                        color: "white",
                        backgroundColor: "white"
                    }
                }}
                indicatorContainerProps={{
                    style: {
                        position: 'relative',
                        bottom: '35px',
                        zIndex: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }
                }}
                navButtonsProps={{
                    style: {
                        padding: '0px 0px',
                        opacity: 0.5,
                    }
                }}
                navButtonsWrapperProps={{
                    style: {
                        top: '40%',
                        transform: 'translateY(-50%)',
                        justifyContent: 'space-between',
                        width: '50px',
                        position: 'absolute',
                    }
                }}
            >
                {
                    items.map((item, i) => <Item key={i} item={item} />)
                }
            </Carousel>
        </div>
    );
}

function Item(props) {
    return (
        <Paper style={{
            width: 800,
            height: 400,
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div className="" style={{
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
                padding: '10px',
                zIndex: 1,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0
            }}>
                <NewspaperIcon style={{ fontSize: '36px', color: 'white', marginRight: '10px' }} />
                <h2 style={{ color: "white", margin: 0, fontSize: 25 }}>Haberler </h2>
            </div>
            <img src={props.item.backgroundImage} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={props.item.header} />
            <div style={{
                zIndex: 1,
                position: 'absolute',
                bottom: 13,
                left: 0,
                right: 0,
                background: 'rgba(0, 0, 0, 0.3)',
                color: 'white',
                textAlign: 'center',
                padding: '10px',
                fontSize: '16px'
            }}>
                <p style={{ margin: 0 }}>{props.item.content}</p>
            </div>
        </Paper>
    );
}

export default News;
