import prisma from "@/lib/prisma";

async function fetchMilestones() {
  try {
    return await prisma.milestone.findMany({
      orderBy: { UnlockingLevel: 'asc' }
    });
  } catch (e) {
    console.error("Milestone fetch error:", e);
    return [];
  }
}

export default fetchMilestones;