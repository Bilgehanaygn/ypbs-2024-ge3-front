'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

/*export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};*/

const theme = createTheme();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </ThemeProvider>
  );
}
