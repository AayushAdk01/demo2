// app/api/progress/route.ts
import { NextResponse } from "next/server";
import { getPlayerProgress } from "@/utils/playerProgress";
import { auth } from "@/auth";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const playerId = Number(session.user.memberId);
    
    if (!playerId || isNaN(playerId)) {
      return NextResponse.json({ error: "Invalid player ID" }, { status: 400 });
    }

    const progress = await getPlayerProgress(playerId);
    return NextResponse.json(progress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch player progress" },
      { status: 500 }
    );
  }
}