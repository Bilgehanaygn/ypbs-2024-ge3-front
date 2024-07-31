"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
    {
      field: 'nameSurname',
      headerName: 'Adı Soyadı',
      width: 150,
      editable: true,
    },
    {
      field: 'unvan',
      headerName: 'Unvan',
      width: 180,
      editable: true,
    },
    {
      field: 'gorev',
      headerName: 'Görev',
      width: 150,
    },
    {
      field: 'birim',
      headerName: 'Birim',
      width: 150,
    },
    {
      field: 'proje',
      headerName: 'Proje',
      width: 150,
    },
    {
      field: 'email',
      headerName: 'E-Mail',
      width: 200,
    },
    {
      field: 'telefon',
      headerName: 'Telefon',
      sortable: false,
      width: 160
    },
  ];



const sampleUsers = [
    { nameSurname: 'Snow', 
        unvan: 'Yazılım Geliştirme', 
        gorev: "vxc" , 
        birim: "vz" , 
        proje: "vzcv"  ,
        email :"fsdf" , 
        telefon: "545685"},
        { nameSurname: 'Sndfow', 
            unvan: 'Yazılıfdfm Geliştirme', 
            gorev: "vz" , 
            birim: "vzvxv" , 
            proje: "vzcvzvzv"  ,
            email :"sdggfdsfs" , 
            telefon: "46546485"}
  ];

export default function DataGridDemo({ users = [] }) {
    console.log(users)
    console.log(sampleUsers)
  return (
    <Box sx={{  width: '100%' }}>
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.email} 
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 7,
            },
          },
        }}
        pageSizeOptions={[5]}
        
        
      />
    </Box>
  );
}
