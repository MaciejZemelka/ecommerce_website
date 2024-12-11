'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import store from "../store/store";
import React, { useEffect } from "react";
import { newAccessToken, logout } from "../store/slices/authSlice";
import { loginUser } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import Header from "../../components/ui/header";
import TopBar from "@/components/ui/topbar";
import Baner from "@/components/ui/baner";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <AuthCheck>{children}</AuthCheck>
    </Provider>


  );
}

const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const isAuthenticated = useSelector((state: any) => state.auth.accessToken);
  const isRefreshToken = useSelector((state: any) => state.auth.refreshToken);
  const expiresAt = useSelector((state: any) => state.auth.expiresAt)

  
  useEffect(() => {
    const fetchNewAccessToken = async () => {
      if(!isRefreshToken){
        dispatch(logout());
      }
      
      const isRefreshTokenValid = async () => {

        const response = await fetch('https://localhost:7084/api/Registration/isRefreshTokenValid', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                refreshToken: localStorage.getItem("refreshToken"),
            }),
        });

        if (!response.ok) {
            dispatch(logout());
           // window.location.href="/";
        }

    }

    await isRefreshTokenValid();

      if ( !isAuthenticated || Date.now() >= expiresAt ) {
        
          await dispatch(newAccessToken());
       
      }
    };
  
    fetchNewAccessToken();
  }, []);
  
  
  return (

      <html lang="en">
        <body className={inter.className}>

        <header>
          <TopBar textColor="black"></TopBar>
          <Header bg_color="bg-white" nav_textColor="text-black" />
          <Baner></Baner>
        </header>
          {children}

        </body>
      </html>

  )
}