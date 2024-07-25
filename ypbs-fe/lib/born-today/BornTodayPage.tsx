"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BornTodayCard } from "./BornTodayCard";
import { createTheme } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";

interface User {
  name: string;
  surname: string;
  birthDate: string;
  image?: string;
}

export default function BornTodayPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>("api/users/born-today");
        setUsers(response.data);
      } catch (error) {
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const theme = createTheme();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Box>
        {users.map((user) => (
          <BornTodayCard
            key={user.name + " " + user.surname}
            name={user.name}
            surname={user.surname}
            birthdate={user.birthDate}
            image={user.image}
          />
        ))}
      </Box>
      <ThemeProvider theme={theme}></ThemeProvider>
    </div>
  );
}
