"use client";

import React from "react";
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
import { Logo } from "../logo-component/Logo";

export const NavigationBar = () => {
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
          <IconButton>
            <ExitToAppIcon style={{ color: "black" }}></ExitToAppIcon>
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
