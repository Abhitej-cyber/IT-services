import { prisma } from "./db";

export async function logActivity({
    userId,
    action,
    entity,
    entityId,
    details,
}: {
    userId: string;
    action: string;
    entity: string;
    entityId?: string;
    details?: string;
}) {
    try {
        await prisma.activityLog.create({
            data: {
                userId,
                action,
                entity,
                entityId,
                details,
            },
        });
    } catch (error) {
        console.error("Failed to log activity:", error);
    }
}
