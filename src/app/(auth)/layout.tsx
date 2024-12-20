'use client'

import { Inter } from "next/font/google";
import Header from "../../components/ui/header";
import { Provider, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import store from "../store/store";
import React from "react";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Provider store={store}>
      <AuthRedirect>{children}</AuthRedirect>
    </Provider>
  );
}

function AuthRedirect({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useSelector((state: any) => state.auth.accessToken);
  const expiresAt = useSelector((state: any) => state.auth.expiresAt)
  React.useEffect(() => {
    if (isAuthenticated && Date.now() < expiresAt) {
      router.push("/panel");
    }
  }, []);

  return (

    <html lang="en">
      <body className={inter.className}>

        <header>
          <Header bg_color="bg-black" nav_textColor="text-white" />
        </header>
        {children}

      </body>
    </html>

  );
}