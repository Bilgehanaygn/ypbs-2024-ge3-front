"use client";

import React from 'react';
import { Box, Card } from '@mui/material';
import RehberHeader from './RehberHeader';
import RehberContent from './RehberContent';

interface RehberBoxProps {
    variant: string;
}

const RehberBox: React.FC<RehberBoxProps> = ({ variant }) => {
    return(
        <Card sx={{p:1, display: 'flex', flexDirection: 'column', gap:1}}>
            <RehberHeader variant={variant}/>
            <RehberContent variant={variant}></RehberContent>
        </Card>
    );
};

export default RehberBox;
