import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReduxToolkitProvider from "@/Providers/RTKQueryProvider";
import { NavBar } from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import NextAuthSessionProvider from "@/Providers/NextAuthSessionProvider";
import TestComponent from "@/components/TestComponent";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lost & Found",
  description:
    "Find whatever you've lost. Report items you've found which belongs to someone else",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // className={inter.className}
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          <ReduxToolkitProvider>
            <NavBar />
            <TestComponent />
            {children}
            <Toaster />
            <Footer />
          </ReduxToolkitProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
