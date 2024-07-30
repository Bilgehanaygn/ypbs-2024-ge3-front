"use client";

import './styles.css';
import LoginPage from "@/lib/login-page/LoginPage";
import { UserContext } from "@/lib/context/UserContext";
import { useContext } from "react";
import HomePage from '@/lib/home-page/HomePage';


export default function Home() {
    const [userState, setUserState] = useContext(UserContext);

    return (
        <>
        {userState && <HomePage/>}
        {!userState && <LoginPage/>}
        </>
    );
}
