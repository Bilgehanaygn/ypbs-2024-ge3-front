"use client";

import { Box } from "@mui/material";
import News from "@/lib/news/News";
import BornThisMonthPage from "@/lib/born-this-month/BornThisMonthPage";

export default function HomePage() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                position: 'fixed',
                bottom: 0,
                left: 0,
                width: '100%',
                padding: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
        >
            <Box sx={{ marginRight: '16px' }}>
                <News />
            </Box>
            <Box>
                <BornThisMonthPage />
            </Box>
        </Box>
    );
}
