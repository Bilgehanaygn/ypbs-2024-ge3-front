"use client";

import React, { useContext } from "react";
import { useRouter } from "next/navigation";

import {
  AppBar,
  Toolbar,
  Button,
  Stack,
  Divider,
  Typography,
  IconButton,
} from "@mui/material";
import { UserComponent } from "@/lib/common-component/navigation-bar/user-component/UserComponent";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Logo } from "@/lib/common-component/logo-component/logo";
import axios from "axios";
import useSWR from "swr";

export const NavigationBar = () => {
  const router = useRouter();
  const { data: userState, mutate } = useSWR("/api/user/userHeader");

  const routeToHome = () => {
    router.push('/');
  };

  const routeToRehber = () => {
    router.push('/rehber');
  };

  async function handleLogout() {
    try {
      const response = await axios.get("api/auth/logout");
      console.log(response.data);
      mutate(() => null);
      router.push("/");
    } catch (error) {
      console.error("Hata:", error);
    }
  }

  return (
    <AppBar
      position="fixed"
      style={{
        height: "65px",
        backgroundColor: "white",
      }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <Stack direction="row" alignItems="center" spacing={2} onClick={routeToHome} sx={{ cursor: 'pointer' }} >
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
          }}>
          <Button color="inherit" sx={{ fontSize: "0.75rem" }}>
            <Typography variant="caption">Genel</Typography>
          </Button>
          <Button onClick={routeToRehber} color="inherit" sx={{ fontSize: "0.75rem" }}>
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
            {userState && (
                <UserComponent
                    name={userState.name}
                    surname={userState.surname}
                    photo={userState.photo} // Pass the photo data to the UserComponent
                />
            )}
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
