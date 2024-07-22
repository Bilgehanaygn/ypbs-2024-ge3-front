'use client';

import Image from "next/image";
import { createTheme, colors, ThemeProvider } from "@mui/material";

import dynamic from 'next/dynamic';
import React from 'react';

const LoginPage = dynamic(() => import('../../lib/login-page/LoginPage'));

export default function Home() {
    return (
            <LoginPage />
    );
  }