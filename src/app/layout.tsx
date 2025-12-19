import Providers from "@/app/providers/query-client";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.scss";

const rubikSans = Rubik({
  variable: "--font-rubik-sans",
  subsets: ["latin"],
  display: 'swap'
});

export const metadata: Metadata = {
  title: "Test-Constructor",
  description: "Created by David",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubikSans.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
