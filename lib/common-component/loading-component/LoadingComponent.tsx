"use client";

import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const LoadingComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: theme.palette.background.default,
      }}>
      <CircularProgress sx={{ color: "red" }} />
      <Typography
        variant="h6"
        sx={{
          mt: 5,
          color: "black",
          textAlign: "center",
        }}>
        Yükleniyor...
      </Typography>
    </Box>
  );
};

export default LoadingComponent;
