import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

const imbPlexSans = localFont({
  src: [
    { path: "./fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
    {
      path: "./fonts/IBMPlexSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
  ],
});

const BebasNeue = localFont({
  src: [
    { path: "./fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
  ],
  variable: "--bebas-neue",
});

export const metadata: Metadata = {
  title: "BookWise",
  description: "BookWise is a book borrowing university library management",
};

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body
          className={`${imbPlexSans.className} ${BebasNeue.variable} antialiased`}>
          {children}

          <Toaster />
        </body>
      </html>
    </SessionProvider>
  );
};

export default RootLayout;
