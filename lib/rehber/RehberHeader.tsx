"use client";

import React from 'react';
import ContactsIcon from '@mui/icons-material/Contacts';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, IconButton, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'; 

interface RehberHeaderProps {
    variant: string;
}

const RehberHeader: React.FC<RehberHeaderProps> = ({ variant }) => {
    const router = useRouter(); 
    const routeToRehber = () => {
        router.push('/rehber'); 
    };

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" p={1}>
                <ContactsIcon color="inherit" fontSize="small"/>
                <Typography variant="subtitle1" color="black" ml={1}>REHBER</Typography>
            </Box>
            {variant === "home" && (
                <Box>
                    <IconButton sx={{ display: 'flex', 
                        padding:"0px 0px 10px px",
                        width: '100%', 
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
                    }}>
                    <OpenInNewIcon/>
                    </IconButton>
                </Box>
            )}
        </Box>
    );
};

export default RehberHeader;
