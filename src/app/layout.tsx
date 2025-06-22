import type { Metadata } from "next";
//import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ReduxToolkitProvider from "@/Providers/RTKQueryProvider";
import { NavBar } from "@/components/ui/NavBar";
import Footer from "@/components/ui/Footer";
import NextAuthSessionProvider from "@/Providers/NextAuthSessionProvider";
import NextTopLoader from "nextjs-toploader";
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
        <ReduxToolkitProvider>
          <NextAuthSessionProvider>
            <NextTopLoader color="#0e7490" showSpinner={false} />
            <NavBar />
            {children}
            <Toaster />
            <Footer />
          </NextAuthSessionProvider>
        </ReduxToolkitProvider>
      </body>
    </html>
  );
}
