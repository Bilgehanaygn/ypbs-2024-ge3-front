"use client";

import News from "@/lib/news/News";
import { ThemeProvider } from "@mui/material/styles";
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
