import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FoldersProvider } from "@/contexts/FoldersContext";
import { LinksProvider } from "@/contexts/LinksContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "한입 링크 - 북마크 서비스",
  description: "효율적인 링크 관리 및 북마크 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-full">
        <FoldersProvider>
          <LinksProvider>{children}</LinksProvider>
        </FoldersProvider>
      </body>
    </html>
  );
}
