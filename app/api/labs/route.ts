import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// GET /api/labs - List labs with RBAC
export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const deptId = searchParams.get("deptId");

        const where: any = {};
        if (deptId) where.departmentId = deptId;

        // RBAC: HOD sees their dept labs
        if (session.user.role === "HOD") {
            const user = await prisma.user.findUnique({ where: { id: session.user.id } });
            if (user?.departmentId) where.departmentId = user.departmentId;
        }

        const labs = await prisma.lab.findMany({
            where,
            include: {
                department: { select: { name: true, code: true } },
                incharge: { select: { name: true, email: true } },
                _count: { select: { assets: true } }
            },
            orderBy: { name: "asc" }
        });

        return NextResponse.json(labs);
    } catch (error) {
        console.error("Error fetching labs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

// POST /api/labs - Create lab (Dean/Admin)
export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !["ADMIN", "DEAN"].includes(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { name, code, departmentId, inchargeId, capacity, location } = body;

        if (!name || !code || !departmentId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const cleanInchargeId = inchargeId && inchargeId !== "" ? inchargeId : null;

        const lab = await prisma.lab.create({
            data: {
                name,
                code,
                departmentId,
                inchargeId: cleanInchargeId,
                capacity: parseInt(capacity) || 0,
                location
            }
        });

        // If incharge assigned, update user's labId and departmentId
        if (cleanInchargeId) {
            await prisma.user.update({
                where: { id: cleanInchargeId },
                data: {
                    labId: lab.id,
                    departmentId: departmentId
                }
            });
        }

        return NextResponse.json(lab, { status: 201 });
    } catch (error: any) {
        console.error("Error creating lab:", error);
        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: "A lab with this code already exists, or the selected Incharge is already assigned to another lab." },
                { status: 409 }
            );
        }
        return NextResponse.json({ error: error.message || "Failed to create lab" }, { status: 500 });
    }
}
