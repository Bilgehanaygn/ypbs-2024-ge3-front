"use client";

import './styles.css';
import LoginPage from "@/lib/login-page/LoginPage";
import { UserContext } from "@/lib/context/UserContext";
import { useContext, useEffect, useState } from "react";
import HomePage from '@/lib/home-page/HomePage';
import axios from 'axios';


export default function Home() {
    const [userState, setUserState] = useContext(UserContext);
    const [loadingState, setLoadingState] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          const response = await axios.get("/api/user/userHeader");
          if (response.data !== null) {
            setUserState(response.data);
            setLoadingState(false);
        }
        };
        fetchData();
      }, []);
    
    if(loadingState) {return null;}
    
    
    return (userState ? <HomePage/> : <LoginPage/>);
}

