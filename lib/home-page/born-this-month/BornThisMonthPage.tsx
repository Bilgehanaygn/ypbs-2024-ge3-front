"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { BornThisMonthCard } from "./BornThisMonthCard";
import { createTheme } from "@/lib/theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CircularProgress, Typography } from "@mui/material";

interface User {
  name: string;
  surname: string;
  birthDate: string;
  photo?: string;
}

export default function BornThisMonthPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<User[]>("/api/bornToday");
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
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % users.length);
  };

  const handlePrevious = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + users.length) % users.length);
  };

  return (
    <Box style={{ width: "100%", height: "100%" }}>
      <BornThisMonthCard
        user={users.length > 0 ? users[currentPage] : null}
        onPrevious={users.length > 0 ? handlePrevious : null}
        onNext={users.length > 0 ? handleNext : null}
      />
    </Box>
  );
}
