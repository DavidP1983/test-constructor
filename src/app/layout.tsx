import Providers from "@/app/providers/query-client";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.scss";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ThemeTransitionWrapper } from "./providers/ThemeTransitionWrapper";

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
      <body className={`${rubikSans.variable}`}>
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
