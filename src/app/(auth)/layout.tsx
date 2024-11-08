'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "../components/header";
import store from "../store/store";
import { Provider } from "react-redux";
const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>

          <header>
            <Header bg_color="bg-black" nav_textColor="text-white" />
          </header>
          {children}

        </body>
      </html>
    </Provider>
  );
}