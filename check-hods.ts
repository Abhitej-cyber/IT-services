import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function checkHODs() {
    const hods = await prisma.user.findMany({
        where: { role: "HOD" },
        include: { department: true }
    });
    console.log(JSON.stringify(hods, null, 2));
    await prisma.$disconnect();
}

checkHODs();
