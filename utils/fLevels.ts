import prisma from "@/lib/prisma"

async function fetchLevels() {
    try {
      return await prisma.level.findMany({ 
        orderBy: { Level_number: 'asc' } // Use Level_number instead of ID
      });
    } catch (e) {
      console.error("Failed to fetch levels:", e);
      return [];
    }
  }

export default fetchLevels