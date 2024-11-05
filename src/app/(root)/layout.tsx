'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";

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

          
          {children}

        </body>
      </html>
    </Provider>
  );
}