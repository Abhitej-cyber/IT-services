import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function check() {
    try {
        console.log("Checking database connection...");
        const userCount = await prisma.user.count();
        console.log(`✅ Success! Connected to MySQL.`);
        console.log(`📊 Found ${userCount} users in the database.`);

        const users = await prisma.user.findMany({
            select: { email: true, role: true }
        });
        console.log("Users found:", users);

    } catch (error) {
        console.error("❌ Connection failed:", error);
    } finally {
        await prisma.$disconnect();
    }
}

check();
