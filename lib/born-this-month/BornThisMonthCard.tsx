import React from "react";
import {
  Box,
  Card,
  Typography,
  Divider,
  IconButton,
  Avatar,
  CardContent,
} from "@mui/material";
import CakeIcon from "@mui/icons-material/Cake";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

interface User {
  name: string;
  surname: string;
  birthDate: string;
  photo?: string;
}

interface BornTodayCardProps {
  user: User | null;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function BornThisMonthCard({ user, onPrevious, onNext }: BornTodayCardProps) {
  const cardStyle = {
    width: "12vw",
    height: "40vh",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    borderRadius: "1.5vw",
    padding: "0.5vw",
  };

  const iconStyle = {
    fontSize: "1.5vw",
  };

  const titleStyle = {
    fontWeight: "bold",
    fontSize: "1vw",
    color: "black",
  };

  const currentDate = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });

  return (
      <Card sx={cardStyle}>
        <CardContent
            sx={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
            }}
        >
          <Box display="flex" alignItems="center" justifyContent="center" sx={{ mb: "0.5vw" }}>
            <CakeIcon sx={{iconStyle, margin: "3px"}} />
            <Typography variant="h6" sx={titleStyle}>
              BU AY DOĞANLAR
            </Typography>
          </Box>
          <Divider
              orientation="horizontal"
              flexItem
              sx={{ backgroundColor: "lightgray", mb: "0.5vw" }}
          />
          <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ flexGrow: 1, justifyContent: "center" }}
          >
            {user ? (
                <>
                  <Avatar
                      src={user.photo ? `data:image/jpeg;base64,${user.photo}` : undefined}
                      alt={`${user.name} ${user.surname}`}
                      sx={{ width: "6vw", height: "6vw", mb: "0.5vw", border: "0.15vw solid #ddd" }}
                  />
                  <Typography variant="subtitle2" sx={{ mb: "0.5vw", fontWeight: "bold", color: "black" }}>
                    İyi ki doğdun!
                  </Typography>
                  <Typography variant="subtitle2" sx={{ mb: "0.5vw", color: "red", fontWeight: "bold" }}>
                    {`${user.name} ${user.surname}`}
                  </Typography>
                  <Typography color="textSecondary" noWrap sx={{ mb: "0.5vw", color: "black" }}>
                    Seninle daha güçlüyüz!
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="black">
                    {currentDate}
                  </Typography>
                </>
            ) : (
                <>
                  <Typography variant="h6" sx={{fontSize: "1.2vw", color: "gray", fontWeight: "bold" }}>
                    Bu ay doğan personel yok
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color="black" sx={{fontSize: "1vw", mt: "2vw", fontWeight: "bold" }}>
                    {currentDate}
                  </Typography>
                </>

            )}
          </Box>
          {user && (
              <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: "0.5vw" }}>
                <IconButton sx={{ color: "red", padding: 0 }} onClick={onPrevious}>
                  <ArrowBackIosIcon fontSize="small" />
                </IconButton>
                <IconButton sx={{ color: "red", padding: 0 }} onClick={onNext}>
                  <ArrowForwardIosIcon fontSize="small" />
                </IconButton>
              </Box>
          )}
        </CardContent>
      </Card>
  );
}
