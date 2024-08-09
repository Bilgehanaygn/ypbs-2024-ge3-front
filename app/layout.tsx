"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { createTheme } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { NavigationBar } from "../lib/navigation-bar/NavigationBar";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import LoadingPage from "@/lib/loading/LoadingPage";
import useSWR from "swr";
import { UserInterface } from "@/lib/user/user";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = createTheme();
  const pathName = usePathname();

  const { data: userState, isLoading } = useSWR(
    "/api/user/userHeader",
    fetchUserData,
    {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
    }
  );

  async function fetchUserData() {
    const response = await axios.get<UserInterface>("/api/user/userHeader");
    return response.data;
  }

  if (isLoading) {
    return (
      <html lang="en">
        <body className={inter.className}>
          <LoadingPage />
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
