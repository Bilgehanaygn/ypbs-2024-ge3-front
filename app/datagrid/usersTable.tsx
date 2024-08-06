import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Avatar, IconButton, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';
import { DatagridFilters } from './datagrid_filters';

const UsersTable = () => {
  const [users, setUsers] = useState<GridRowsProp>([]);
  const [nameSurname, setNameSurname] = useState<string>('');
  const [unvan, setUnvan] = useState<string>('');
  const [gorev, setGorev] = useState<string>('');
  const [birim, setBirim] = useState<string>('');
  const [proje, setProje] = useState<string>('');
  const [takim, setTakim] = useState<string>('');
  const [katki, setKatki] = useState<string>('');

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

  const columns: GridColDef[] = [
    {
      field: 'avatar',
      headerName: '',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
          <Avatar></Avatar>
        </div>
      ),
    },
    {
      field: 'isimSoyisim',
      headerName: 'İsim Soyisim',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          <Typography variant="body2" style={{marginTop:10,marginBottom:10}}>{params.value}</Typography>
        </div>
      ),
    },
    {
      field: 'birim',
      headerName: 'Birim',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          <Typography variant="body2" style={{marginTop:10,marginBottom:10}}>
            {params.value}
            </Typography>
        </div>
      ),
    },
    {
      field: 'unvan',
      headerName: 'Unvan',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          <Typography variant="body2" style={{marginTop:10,marginBottom:10}}>
            {params.value}
            </Typography>
        </div>
      ),
    },
    {
      field: 'gorevVeProje', // gorev + proje
      headerName: 'Görev - Proje',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', height: '100%',
        marginTop:15,marginBottom:15 }}>
          {params.value.map((item, index) => (
            <Typography
              key={index}
              variant="body2"
              style={{
                width: '100%',
                whiteSpace: 'normal', 
                wordWrap: 'break-word', 
              }}
            >
            {item.gorev} - {item.proje} 
            </Typography>
          ))}
        </div>
      ),
    },
    {
      field: 'email',
      headerName: 'E-Posta',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <a
            href={`mailto:${params.row.email}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <EmailIcon color="secondary" />
          </a>
          <Typography variant="body2" style={{ marginLeft: 8 ,marginTop:10,marginBottom:10}}>
            {params.value}
          </Typography>
        </div>
      ),
    },
    {
      field: 'telefon',
      headerName: 'Telefon',
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
          <a
            href={`tel:${params.row.telefon}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <PhoneIcon color="secondary" />
          </a>
          <Typography variant="body2" style={{ marginLeft: 8 }}>
            {params.value}
          </Typography>
        </div>
      ),
    },
    {
      field: 'expand',
      headerName: '',
      width: 50,
      disableColumnMenu: true,
      sortable: false,
      resizable: false,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
          <IconButton style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <OpenInNewIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  const getRowHeight = () => {
    return 'auto';
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DatagridFilters
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
        katki={katki}
        setKatki={setKatki}
        takim={takim}
        setTakim={setTakim}
      />
      <br />
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.email}
        getRowHeight={getRowHeight}
      />
    </div>
  );
};

export default UsersTable;
