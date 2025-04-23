import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "./components/SessionProvider";
import { auth } from "@/auth";
import Navbar from "@/app/components/navbar";
import ObserverProvider from "./components/ObserverPovider";
import Footer from "./components/footer";
import NextTopLoader from "nextjs-toploader";
import PlayerContextProvider from "./context/playerContext";

export const metadata: Metadata = {
  title: "Guhuza’s Brain Boost",
  description: "Level Up Your Job Search with Guhuza’s Brain Boost",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await auth()

  return (
    <html lang="en">
      <body>
        <NextTopLoader />
        <SessionProvider session={session}>
        <ObserverProvider>
          <PlayerContextProvider>
            <Navbar />
            {children}
            <Footer />
          </PlayerContextProvider>
        </ObserverProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
