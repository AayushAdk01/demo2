import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import ObserverProvider from "../components/ObserverPovider";
import Footer from "../components/footer";
import NextTopLoader from "nextjs-toploader";
import PlayerContextProvider from "./context/playerContext";


const inter = Inter({ subsets: ["latin"] });
const spacegrotesk = Space_Grotesk({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Guhuza Quiz Application",
  description: "Level Up Your Job Search with Guhuza Quiz Game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spacegrotesk.className}>
        <NextTopLoader />

        <ObserverProvider>
          <PlayerContextProvider>
          <Navbar />
          {children}
          <Footer />
          </PlayerContextProvider>
        </ObserverProvider>
      </body>
    </html>
  );
}
