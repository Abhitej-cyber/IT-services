import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const lab = await prisma.lab.findUnique({
            where: { id },
            include: {
                department: { select: { name: true } },
                incharge: { select: { name: true, email: true } },
                _count: { select: { assets: true } }
            }
        });

        if (!lab) return NextResponse.json({ error: "Lab not found" }, { status: 404 });

        return NextResponse.json(lab);
    } catch (error) {
        console.error("Error fetching lab:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session || !["ADMIN", "DEAN", "HOD"].includes(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const { inchargeId, ...otherData } = body;

        // Fetch current lab to check department
        const currentLab = await prisma.lab.findUnique({
            where: { id },
            select: { departmentId: true }
        });

        if (!currentLab) return NextResponse.json({ error: "Lab not found" }, { status: 404 });

        // RBAC Check for HOD
        if (session.user.role === "HOD") {
            const hod = await prisma.user.findUnique({
                where: { id: session.user.id },
                select: { departmentId: true }
            });

            if (hod?.departmentId !== currentLab.departmentId) {
                return NextResponse.json({ error: "HODs can only manage labs within their department" }, { status: 403 });
            }
        }

        const cleanInchargeId = inchargeId && inchargeId !== "" ? inchargeId : (inchargeId === "" ? null : undefined);

        const lab = await prisma.lab.update({
            where: { id },
            data: {
                ...otherData,
                inchargeId: cleanInchargeId
            }
        });

        // Sync user role/lab if incharge changed
        if (cleanInchargeId) {
            await prisma.user.update({
                where: { id: cleanInchargeId },
                data: {
                    labId: lab.id,
                    departmentId: lab.departmentId
                }
            });
        }

        return NextResponse.json(lab);
    } catch (error) {
        console.error("Error updating lab:", error);
        return NextResponse.json({ error: "Failed to update lab" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        if (!session || !["ADMIN", "DEAN"].includes(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        await prisma.lab.delete({ where: { id } });

        return NextResponse.json({ message: "Lab deleted successfully" });
    } catch (error) {
        console.error("Error deleting lab:", error);
        return NextResponse.json({ error: "Failed to delete lab" }, { status: 500 });
    }
}
