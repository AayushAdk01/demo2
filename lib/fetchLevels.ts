import { PrismaClient } from "@prisma/client/extension"
const prisma = new PrismaClient()

import React from 'react'

async function fetchLevels() {

    const levels = await prisma.level.findMany({})
    return levels

}

export default fetchLevels