"use client";

import News from "@/lib/home-page/news/News";
import { Box } from "@mui/material";
import RehberBox from "../rehber/RehberBox";



export default function HomePage() {
  return (
    <Box>
      <RehberBox variant="home"/>
      <News />
    </Box>
  );
}
