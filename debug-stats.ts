import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function run() {
    const total = await prisma.asset.count();
    const active = await prisma.asset.count({ where: { status: 'ACTIVE' } });
    const maintenance = await prisma.asset.count({ where: { status: 'UNDER_MAINTENANCE' } });
    const critical = await prisma.ticket.count({ where: { priority: 'CRITICAL', status: { not: 'RESOLVED' } } });
    const pendingRequests = await prisma.request.count({ where: { status: 'PENDING' } });

    console.log(JSON.stringify({ total, active, maintenance, critical, pendingRequests }, null, 2));
}

run().catch(console.error).finally(() => prisma.$disconnect());
