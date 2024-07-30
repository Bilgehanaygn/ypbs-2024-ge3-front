"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { NavigationBar } from "../lib/navigation-bar/NavigationBar";
import { usePathname, useRouter } from "next/navigation";
import { userInterface, UserContext } from "@/lib/context/UserContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoginPage from "@/lib/login-page/LoginPage";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme();
  const pathName = usePathname();
  

  const [userState, setUserState] = useState<userInterface | null>(null);
  const router = useRouter();
  const [loadingState, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/userHeader");
        if (response.data) {
          setUserState(response.data);
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [router]);
  
  if (loadingState) {
    return (
      <html lang="en">
      <body className={inter.className}>
      <div>Loading...</div> 
      </body>
    </html>
    )
  }//TODO:loading component koyulacak
  

  return ( 
      <html lang="en">
      <body className={inter.className}>
        <UserContext.Provider value={[userState, setUserState]}>
          <ThemeProvider theme={theme}>
            {userState && <NavigationBar />}
            {userState && <div style={{ marginTop: 0, height: 65 }}></div>}
            {((pathName==="/") || userState) && <div style={{ height: 500 }}>{ children}</div>}
          </ThemeProvider>
        </UserContext.Provider>
      </body>
    </html>
  );
}
