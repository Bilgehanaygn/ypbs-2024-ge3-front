"use client";

import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { Box, Avatar, IconButton, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {useRouter} from "next/navigation";

interface RehberTableProps {
    users: GridRowsProp
}

const RehberTableVariantRehber: React.FC<RehberTableProps> = ({ users }) => {
    const router = useRouter();
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
              <IconButton sx={{ display: 'flex', 
                padding:"0px 0px 0px 0px",
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
              <EmailIcon color="secondary" />
            </IconButton>
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
              <IconButton sx={{ display: 'flex', 
                padding:"0px 0px 0px 0px",
                justifyContent: 'center', 
                alignItems: 'center', 
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
                <PhoneIcon color="secondary" />
              </IconButton>
            
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
               onClick={() => router.push(`/profile/${params.row.id}`)}>
            <IconButton sx={{ display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
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
              <OpenInNewIcon />
            </IconButton>
          </div>
        ),
      },
    ];
  
    const getRowHeight = () => {
      return 'auto';
    };
    return(
        <Box sx={{height:"500px"}}>
            <DataGrid
                rows={users}
                columns={columns}
                getRowId={(row) => row.email}
                getRowHeight={getRowHeight}
            />
        </Box>
    );
};

export default RehberTableVariantRehber;
