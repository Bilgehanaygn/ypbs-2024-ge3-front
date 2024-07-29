"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { NavigationBar } from "../lib/navigation-bar/NavigationBar";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme();
  const pathName = usePathname();
  const isLoginPage = pathName === "/login";
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          {!isLoginPage && <NavigationBar />}
          {!isLoginPage && <div style={{ marginTop: 0, height: 65 }}></div>}
          <div style={{ height: 500 }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
