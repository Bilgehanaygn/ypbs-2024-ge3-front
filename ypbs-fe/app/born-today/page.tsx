'use client';
import useSWR from "swr";
import { getFetcher } from "../api_helper/fetchers";
import { useEffect, useState } from "react";
import axios from "axios";
import { BornTodayCard } from "./born_today_card";
import { createTheme } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { BORN_TODAY_PATH } from "../api_helper/URLs";


export default function Page() {
  const [users, setUsers] = useState([]);

  const { data, error } = useSWR(BORN_TODAY_PATH, getFetcher);

  if(error){
    return <div>Not able to load User.</div>
  }

  useEffect(() => {
    if(data){
      setUsers(data);
    }
  }, [data]);

  const theme = createTheme();


  return (
    <div >
      <Box>
        {users.map((user) =>  (<BornTodayCard key={user.name + " " + user.surname} name={user.name} surname={user.surname} birthdate={user.birthDate} image={user.image}/>))}

      </Box>
      <ThemeProvider theme={theme}> 
      </ThemeProvider>
    </div>
  );
}