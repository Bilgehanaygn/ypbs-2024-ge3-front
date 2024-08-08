"use client";

import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import { DataGrid, GridRowsProp } from '@mui/x-data-grid';
import RehberSearchBar from './RehberSearchBar';
import RehberTableVariantRehber from './RehberTableVariantRehber';
import RehberTableVariantHome from './RehberTableVariantHome';

interface RehberContentProps {
    variant: string;
}

const RehberContent: React.FC<RehberContentProps> = ({ variant }) => {
    const [users, setUsers] = useState<GridRowsProp>([]);
    const [nameSurname, setNameSurname] = useState<string>('');
    const [unvan, setUnvan] = useState<string>('');
    const [gorev, setGorev] = useState<string>('');
    const [birim, setBirim] = useState<string>('');
    const [proje, setProje] = useState<string>('');
    const [takim, setTakim] = useState<string>('');

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('/api/user/findUsersWithFilters', {
            params: {
              nameSurname,
              birim,
              unvan,
              gorev,
              proje,
              takim
            },
          });
          setUsers(response.data);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      };
  
      fetchUsers();
    }, [nameSurname, unvan, gorev, birim, proje, takim]);
    return(
        <Box sx={{display: 'flex', flexDirection: 'column', gap:0.5 }}>
            <RehberSearchBar 
                variant={variant} 
                nameSurname={nameSurname}
                setNameSurname={setNameSurname}
                unvan={unvan}
                setUnvan={setUnvan}
                gorev={gorev}
                setGorev={setGorev}
                birim={birim}
                setBirim={setBirim}
                proje={proje}
                setProje={setProje}
                takim={takim}
                setTakim={setTakim}
            />

        {(variant==="home") && <RehberTableVariantHome users={users} />}
        {(variant==="rehber") && <RehberTableVariantRehber users={users} />}
            
        </Box>
        
    );
};

export default RehberContent;
