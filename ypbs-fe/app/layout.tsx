"use client";
import {Inter} from "next/font/google";
import "./globals.css";
import {createTheme} from "@/lib/theme/theme";
import {ThemeProvider} from "@mui/material/styles";
import {NavigationBar} from "../lib/navigation-bar/NavigationBar";
import {usePathname, useRouter} from 'next/navigation';
import {userInterface, UserContext} from "@/lib/context/UserContext";
import {useContext, useEffect, useState} from "react";

const inter = Inter({subsets: ["latin"]});


export default function RootLayout({children,}: { children: React.ReactNode; }) {
    const theme = createTheme();
    const pathName = usePathname();
    const isLoginPage = pathName === "/login";

    const [userState,setUserState] = useState<userInterface | null>(null);
    const router = useRouter();

    useEffect(() => { //Bu burda olsa da olur olmasa da olur normalde sadece burda olsa yine çalışcak ama çalışmıyo
        console.log(userState);
        if(userState===null){
            router.push("/login");
        }
    }, []);


    return (
        <html lang="en">
        <body className={inter.className}>
        <UserContext.Provider value={[userState,setUserState]}> {/*UserContext de commentlediğim yerlerin commentini kaldırısan buraya sadece UserProvider yazsan aynı şey */}
            <ThemeProvider theme={theme}>
                {!isLoginPage && <NavigationBar/>}
                {!isLoginPage && <div style={{marginTop: 0, height: 65}}></div>}
                <div style={{height: 500}}>
                    {children}
                </div>
            </ThemeProvider>
        </UserContext.Provider>
        </body>
        </html>

    );
}
