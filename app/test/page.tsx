'use client';

import React from 'react';

import EgitimComponent from "@/lib/profile-page/egitim-component/EgitimComponent";
import KatkiComponent from "@/lib/profile-page/katki-component/KatkiComponent";
import DahilProjelerComponent from "@/lib/profile-page/dahil-projeler-component/DahilProjelerComponent";
import DeneyimComponent from "@/lib/profile-page/deneyim-component/DeneyimComponent";
import DosyaComponent from "@/lib/profile-page/dosya-component/DosyaComponent";
import {Card} from "@mui/material";

export default function Home() {
    return (
        <Card sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            p: 4,
        }}>
            <DahilProjelerComponent/>
            <EgitimComponent/>
            <DeneyimComponent/>
            <KatkiComponent/>
            <DosyaComponent/>
        </Card>
    );
}