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
      <body className="bg-[#0B101B] font-Inter lg:bg-swirl-pattern bg-no-repeat drop-shadow-custom-drop-shadow">
        <div className="rotating-cube-container">
          <div
            className="absolute lg:top-0 top-[10.56%] left-[67.55%] right-[15.28%] bottom-[65.22%] md:w-[161.21px] md:h-[161.21px] xl:w-[261.21px] xl:h-[261.21px] w-[76.93px] h-[76.93px] -z-10 xl:rounded-[49.217px] rounded-[17.44px] bg-[#0e131e] shadow-[0px_-24px_39px_#040406,0px_10.7667px_26.9168px_rgba(0,0,0,0.1)] backdrop-blur-[43.0669px]"
            style={{
              transformStyle: "preserve-3d",
              transform: "translate(-45deg)",
              animation: "rotate-cube 10s infinite linear",
            }}
          ></div>

          <div
            className="absolute top-[25.17%] lg:top-[58.17%] left-[64.13%] right-[13.8%] bottom-[17.41%] md:w-[235.74px] md:h-[235.74px] xl:w-[335.74px] xl:h-[335.74px]  w-[98.88px] h-[98.88px] -z-10 rounded-[17.44px] xl:rounded-[59.217px] bg-cube_clr shadow-[0px_25px_39px_#040406,0px_10.7667px_26.9168px_rgba(0,0,0,0.1)] backdrop-blur-[43.0669px]"
            style={{
              transformStyle: "preserve-3d",
              transform: "translate(-45deg)",
              animation: "rotate-cube 10s infinite linear",
            }}
          ></div>

          <div
            className="absolute lg:top-[65.05%] top-[32.05%] left-[0%] xl:left-[10%] right-[77.94%] bottom-[6.53%] md:w-[235.74px] md:h-[235.74px] xl:w-[335.74px] xl:h-[335.74px] w-[98.88px] h-[98.88px] -z-10 xl:rounded-[59.217px] rounded-[17.44px] bg-cube_clr shadow-[0px_-24px_39px_#040406,0px_10.7667px_26.9168px_rgba(0,0,0,0.1)] backdrop-blur-[43.0669px]"
            style={{
              transformStyle: "preserve-3d",
              transform: "translate(-45deg)",
              animation: "rotate-cube 10s infinite linear",
            }}
          ></div>
        </div>

        <ToastProvider />
        <NextAuthSessionProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
