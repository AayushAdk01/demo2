import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export function middleware(req: NextRequest) {
    const cookieStore = cookies();
    const isLoggedIn = cookieStore.get("LoggedIn")?.value === "true";
    const playerLevel = Number(cookieStore.get("PlayerLevel")?.value) || 0;

    const { pathname } = req.nextUrl;

    if (isLoggedIn && pathname === "/quiz") {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    if (!isLoggedIn && pathname === "/profile") {
        return NextResponse.redirect(new URL("/quiz", req.url));
    }

    // If user tries to access /quiz/[level], enforce level restriction
    const levelMatch = pathname.match(/^\/quiz\/(\d+)$/);

    if (levelMatch) {
        const requestedLevel = Number(levelMatch[1]);
        if (!isLoggedIn && requestedLevel!=1) {
            return NextResponse.redirect(new URL("/quiz/1", req.url));
        } else if (isLoggedIn && requestedLevel > playerLevel) { 
            return NextResponse.redirect(new URL("/quiz/"+playerLevel, req.url))
        }
    }

    return NextResponse.next(); // Allow access to other pages
}

export const config = {
    matcher: ["/quiz/:path*", "/profile"], // Apply middleware to these routes
};