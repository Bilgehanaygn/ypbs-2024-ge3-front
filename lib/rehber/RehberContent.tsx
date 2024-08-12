"use client";

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import RehberSearchBar from './RehberSearchBar';
import RehberTableVariantRehber from './RehberTableVariantRehber';
import RehberTableVariantHome from './RehberTableVariantHome';
import useSWR from 'swr';

interface RehberContentProps {
    variant: string;
}

const RehberContent: React.FC<RehberContentProps> = ({ variant }) => {
    
    const {data: users}= useSWR("/api/user/findUsersWithFilters");
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap:0.5 }}>

            <RehberSearchBar variant={variant}/>

            {(variant==="home") && <RehberTableVariantHome users={users} />}
            {(variant==="rehber") && <RehberTableVariantRehber users={users} />}
            
        </Box>
        
    );
};

export default RehberContent;
