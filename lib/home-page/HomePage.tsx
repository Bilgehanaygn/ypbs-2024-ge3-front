"use client";

import News from "@/lib/home-page/news/News";
import { Box } from "@mui/material";
import RehberBox from "../rehber/RehberBox";
import BornThisMonthPage from "@/lib/home-page/born-this-month/BornThisMonthPage";

export default function HomePage() {
  return (
    <Box sx={{ padding: "10px", boxSizing: "border-box" }}>
      <RehberBox variant="home" />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "100%",
          height: "40vh",
          marginTop: "10px",
        }}>
        <div style={{ flex: "0.4" }}>
          <News />
        </div>
        <div style={{ flex: "0.19" }}>
          <BornThisMonthPage />
        </div>
        <div style={{ flex: "0.19" }}>
          <BornThisMonthPage />
        </div>
        <div style={{ flex: "0.19" }}>
          <BornThisMonthPage />
        </div>
      </div>
    </Box>
  );
}
