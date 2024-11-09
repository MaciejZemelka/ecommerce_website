'use client'

import { Inter } from "next/font/google";
import Header from "../components/header";
import { Provider, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Import useRouter

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
  const isAuthenticated = useSelector((state: any) => state.auth.accessToken); // Zakładamy, że stan logowania jest w state.auth.isAuthenticated
  const expiresAt = useSelector((state: any) => state.auth.expiresAt)
  React.useEffect(() => {
    if (isAuthenticated && Date.now() < expiresAt) {
      router.push("/panel");
    }
  }, [isAuthenticated, router]);

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



// 'use client'

// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import Header from "../components/header";
// import store from "../store/store";
// import { Provider } from "react-redux";
// const inter = Inter({ subsets: ["latin"] });


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
    // <Provider store={store}>
    //   <html lang="en">
    //     <body className={inter.className}>

    //       <header>
    //         <Header bg_color="bg-black" nav_textColor="text-white" />
    //       </header>
    //       {children}

    //     </body>
    //   </html>
    // </Provider>
//   );
// }