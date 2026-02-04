import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { logActivity } from "@/lib/logger";

// GET /api/assets - List assets with filters
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        const status = searchParams.get("status");
        const labId = searchParams.get("labId");
        const deptId = searchParams.get("deptId");

        const where: any = {};
        if (type) where.type = type;
        if (status) where.status = status;
        if (labId) where.labId = labId;
        if (deptId) where.departmentId = deptId;

        // RBAC: HOD sees their dept, Lab Incharge sees their lab
        if (session.user.role === "HOD") {
            const user = await prisma.user.findUnique({ where: { id: session.user.id } });
            if (user?.departmentId) where.departmentId = user.departmentId;
        } else if (session.user.role === "LAB_INCHARGE") {
            const user = await prisma.user.findUnique({ where: { id: session.user.id } });
            if (user?.labId) where.labId = user.labId;
        }

        const assets = await prisma.asset.findMany({
            where,
            include: {
                department: { select: { name: true, code: true } },
                lab: { select: { name: true, code: true } },
            },
            orderBy: { updatedAt: "desc" },
        });

        return NextResponse.json(assets);
    } catch (error) {
        console.error("Error fetching assets:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST /api/assets - Create asset
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !["ADMIN", "DEAN"].includes(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const asset = await prisma.asset.create({
            data: {
                ...body,
            },
        });

        await logActivity({
            userId: session.user.id,
            action: "CREATE",
            entity: "ASSET",
            entityId: asset.id,
            details: `Created asset ${asset.assetNumber}`
        });

        return NextResponse.json(asset, { status: 201 });
    } catch (error) {
        console.error("Error creating asset:", error);
        return NextResponse.json({ error: "Failed to create asset" }, { status: 500 });
    }
}
