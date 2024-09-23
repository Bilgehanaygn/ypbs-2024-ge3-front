"use client"
import DahilProjelerComponent from "@/lib/profile-page/dahil-projeler-component/DahilProjelerComponent";
import DosyaComponent from "@/lib/profile-page/dosya-component/DosyaComponent";
import EgitimComponent from "@/lib/profile-page/egitim-component/EgitimComponent";
import KatkiComponent from "@/lib/profile-page/katki-component/KatkiComponent";
import KisiselComponent from "@/lib/profile-page/kisisel-component/KisiselComponent";
import KurumsalComponent from "@/lib/profile-page/kurumsal-component/KurumsalComponent";
import React from "react";
import {Grid} from "@mui/material";

export default function Page() {
    return (
        <Grid container spacing={2} >
            {/* First two components in the same row */}
            <Grid item xs={12} sm={6}>
                <KisiselComponent />
            </Grid>
            <Grid item xs={12} sm={6}>
                <KurumsalComponent />
            </Grid>

            {/* The rest of the components will stack vertically */}
            <Grid item xs={12}>
                <DahilProjelerComponent />
            </Grid>
            <Grid item xs={12}>
                <EgitimComponent />
            </Grid>
            <Grid item xs={12}>
                <KatkiComponent />
            </Grid>
            <Grid item xs={12}>
                <DosyaComponent />
            </Grid>
        </Grid>
    );
}
