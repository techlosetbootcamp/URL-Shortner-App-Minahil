import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/provider/toastProvider";
import NextAuthSessionProvider from "@/provider/nextAuthSessionProvider";
import { ReduxProvider } from "@/provider/reduxProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "URL Shortner App",
  description: "Created by Minahil Ismail",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0B101B] font-Inter bg-swirl-pattern bg-no-repeat drop-shadow-custom-drop-shadow">
      <div className="rotating-cube-container">
          <div className="rotating-cube-1 cube-1"></div>
          <div className="rotating-cube-2 cube-2"></div>
          <div className="rotating-cube-3 cube-3"></div>
        </div>
      <ToastProvider/>
      <NextAuthSessionProvider>
        <ReduxProvider>
        {children}
        </ReduxProvider>
        
        </NextAuthSessionProvider>
        
        </body>
    </html>
  );
}
