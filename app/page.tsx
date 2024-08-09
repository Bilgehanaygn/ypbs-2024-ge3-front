"use client";

import LoginPage from "@/lib/login-page/LoginPage";
import HomePage from "@/lib/home-page/HomePage";
import useSWR from "swr";

export default function Home() {
  const { data: userState } = useSWR("/api/user/userHeader");
  return userState ? <HomePage /> : <LoginPage />;
}
