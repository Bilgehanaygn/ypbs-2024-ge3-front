"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { MuiNavBar } from "../lib/navigation-bar/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = createTheme();
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          <MuiNavBar />
          <div style={{ backgroundColor: "white", height: 500 }}>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
