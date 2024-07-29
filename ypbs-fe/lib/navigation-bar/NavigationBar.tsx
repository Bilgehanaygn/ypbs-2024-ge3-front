"use client";

import React, { useContext } from "react";
import { useRouter } from 'next/navigation'; 

import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { UserComponent } from "../user-component/UserComponent";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Logo } from "../logo-component/logo";
import axios from "axios";
import { UserContext } from "../context/UserContext";

export const NavigationBar = () => {
  const router = useRouter();
  const [userState,setUserState] = useContext(UserContext);

  async function handleLogout(){
    try {
    
      const response = await axios.get("api/auth/logout");
      console.log(response.data);   
      
      setUserState(null);
      router.push('/login');
      

    } catch (error) {
      console.error('Hata:', error);
    }
  }





  return (
    <AppBar
      position="fixed"
      style={{
        height: "65px",
        backgroundColor: "white",
      }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Logo />
          <Divider
            orientation="vertical"
            flexItem
            style={{ backgroundColor: "gray" }}
          />
          <div>
            <Typography color="Black" variant="subtitle1" noWrap>
              Personel Bilgi Sistemi
            </Typography>
          </div>
        </Stack>
        <Stack
          direction="row"
          spacing={2}
          style={{
            alignItems: "center",
          }}
        >
          <Button color="inherit" sx={{ fontSize: "0.75rem" }}>
            <Typography variant="caption">Genel</Typography>
          </Button>
          <Button color="inherit" sx={{ fontSize: "0.75rem" }}>
            <Typography variant="caption">Rehber</Typography>
          </Button>
          <Button color="inherit" sx={{ fontSize: "0.75rem" }}>
            <Typography variant="caption">Organizasyon Şeması</Typography>
          </Button>
          <Divider
            orientation="vertical"
            flexItem
            style={{ backgroundColor: "gray" }}
          />
          <UserComponent name="Serkan" surname="Yılmaz" />
          <Divider
            orientation="vertical"
            flexItem
            style={{ backgroundColor: "gray" }}
          />
          <IconButton onClick={handleLogout}>
            <ExitToAppIcon style={{ color: "black" }}></ExitToAppIcon>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
