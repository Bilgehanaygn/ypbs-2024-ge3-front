"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { NavigationBar } from "@/lib/common-component/navigation-bar/NavigationBar";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import LoadingComponent from "@/lib/common-component/loading-component/LoadingComponent";
import useSWR, {mutate} from "swr";
import { UserInterface } from "@/lib/common/user/user";
import {useEffect, useLayoutEffect} from "react";

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const theme = createTheme();
    const pathName = usePathname();
    const router = useRouter();

  const { data: userState, isLoading } = useSWR(
    "/api/user/userHeader",
    fetchUserData,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

    useEffect(() => {
        const checkAuthentication = async () => {
            const response = await axios.get<UserInterface>("/api/user/userHeader");
            mutate("/api/user/userHeader", response.data);
            if (!response.data && pathName !== "/") router.push("/?navigateTo=" + pathName.slice(1));
        }
        checkAuthentication();
    }, [pathName]);

    async function fetchUserData() {
        const response = await axios.get<UserInterface>("/api/user/userHeader");
        return response.data;
    }

  if (isLoading) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <LoadingComponent />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          {userState ? <NavigationBar /> : null}
          {userState && <div style={{ marginTop: 0, height: 65 }}></div>}
          {(pathName === "/" || userState) && <div>{children}</div>}
        </ThemeProvider>
      </body>
    </html>
  );
}
