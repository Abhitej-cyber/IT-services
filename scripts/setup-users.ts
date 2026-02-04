import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function checkAndCreateUsers() {
    console.log("🔍 Checking database users...\n");

    const password = await hash("admin123", 10);

    // Check existing users
    const existingUsers = await prisma.user.findMany({
        select: {
            email: true,
            name: true,
            role: true,
        },
    });

    console.log("📋 Existing users:");
    existingUsers.forEach(user => {
        console.log(`  - ${user.email} (${user.role}) - ${user.name}`);
    });

    // Create missing users
    const requiredUsers = [
        { email: "admin@example.com", name: "System Administrator", role: "ADMIN" },
        { email: "dean@example.com", name: "Dr. Robert Dean", role: "DEAN" },
        { email: "hod@example.com", name: "Dr. Sarah Johnson", role: "HOD" },
        { email: "lab@example.com", name: "John Lab Tech", role: "LAB_INCHARGE" },
    ];

    console.log("\n✨ Creating/updating users...");

    for (const userData of requiredUsers) {
        await prisma.user.upsert({
            where: { email: userData.email },
            update: {
                password,
                name: userData.name,
                role: userData.role as any,
            },
            create: {
                email: userData.email,
                name: userData.name,
                password,
                role: userData.role as any,
            },
        });
        console.log(`  ✅ ${userData.email} - ${userData.role}`);
    }

    console.log("\n✅ All users ready!");
    console.log("\n🔐 Login credentials:");
    console.log("   Email: admin@example.com");
    console.log("   Password: admin123");
}

checkAndCreateUsers()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error("❌ Error:", e);
        await prisma.$disconnect();
        process.exit(1);
    });
