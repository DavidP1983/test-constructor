import Providers from "@/app/providers/query-client";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ThemeTransitionWrapper } from "./providers/ThemeTransitionWrapper";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload"
          href="/fonts/fontello.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous" />
      </head>
      <body className={`${rubikSans.variable}`} >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            <ThemeTransitionWrapper>
              {children}
            </ThemeTransitionWrapper>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
