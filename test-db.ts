import { prisma } from "./lib/db";

async function test() {
    const assets = await prisma.asset.findMany({
        include: {
            department: true,
            lab: true
        }
    });
    console.log(`Found ${assets.length} assets`);
    if (assets.length > 0) {
        console.log("First asset:", JSON.stringify(assets[0], null, 2));
    }

    const tickets = await prisma.ticket.findMany();
    console.log(`Found ${tickets.length} tickets`);
}

test();
