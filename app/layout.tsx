import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "./components/SessionProvider";
import { auth } from "@/auth";
import Navbar from "@/app/components/navbar";
import ObserverProvider from "./components/ObserverPovider";
import Footer from "./components/footer";
import NextTopLoader from "nextjs-toploader";
import PlayerContextProvider from "./context/playerContext";
import { ProgressProvider } from "@/app/context/progressContext";
import { getPlayerProgress } from "@/utils/playerProgress";

export const metadata: Metadata = {
  title: "Guhuza’s Brain Boost",
  description: "Level Up Your Job Search with Guhuza’s Brain Boost",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  let initialProgress = {};
  
  if (session?.user) {
    try {
      const playerId = Number(session.user.memberId);
      initialProgress = await getPlayerProgress(playerId);
    } catch (error) {
      console.error("Failed to fetch initial progress:", error);
    }
  }

  return (
    <html lang="en">
      <body>
        <NextTopLoader />
        <SessionProvider session={session}>
          <ObserverProvider>
            <PlayerContextProvider>
              <ProgressProvider initialProgress={initialProgress}>
                <Navbar />
                {children}
                <Footer />
              </ProgressProvider>
            </PlayerContextProvider>
          </ObserverProvider>
        </SessionProvider>
      </body>
    </html>
  );
}