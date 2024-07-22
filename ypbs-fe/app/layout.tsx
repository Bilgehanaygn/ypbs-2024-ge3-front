'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

/*export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};*/



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme();
  return (
    
    <html lang="en">
      <body className={inter.className}>
        <div style={{backgroundColor:'white', height:500}}>
      <ThemeProvider theme={theme}>
        {children}
        </ThemeProvider>
        </div>
        </body>
    </html>
    
  );
}
