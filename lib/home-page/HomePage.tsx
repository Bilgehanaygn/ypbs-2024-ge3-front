"use client";

import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import News from "@/lib/news/News";



export default function HomePage() {
  
  return (
    <div className="anaSayfaDiv">
        <News/>
    </div>
  );
}
