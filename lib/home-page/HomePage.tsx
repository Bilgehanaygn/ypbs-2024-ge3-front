"use client";

import News from "@/lib/home-page/news/News";
import { Box } from "@mui/material";
import RehberBox from "../rehber/RehberBox";
import BornThisMonthPage from "@/lib/home-page/born-this-month/BornThisMonthPage";



export default function HomePage() {
  return (
    <Box>
      <RehberBox variant="home"/>
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexGrow: 1,
                gap: 2,
            }}
        >
            <News />
            <BornThisMonthPage />
        </Box>
    </Box>
  );
}
