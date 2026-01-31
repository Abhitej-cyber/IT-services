"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAsset(formData: FormData) {
    const name = formData.get("name") as string;
    const assetTag = formData.get("assetTag") as string;
    const type = formData.get("type") as string;
    const serialNumber = formData.get("serialNumber") as string;
    const status = formData.get("status") as string;

    if (!name || !assetTag || !type) {
        return { message: "Missing required fields" };
    }

    try {
        await prisma.asset.create({
            data: {
                name,
                assetTag,
                type,
                serialNumber,
                status: status || "AVAILABLE",
            },
        });
    } catch (e) {
        console.error(e);
        return { message: "Failed to create asset" };
    }

    revalidatePath("/dashboard/assets");
    redirect("/dashboard/assets");
}

export async function createUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    // For simplicity, password is hardcoded or generated. Ideally use a proper auth flow.
    const password = "password123";

    if (!name || !email) {
        return { message: "Missing required fields" };
    }

    try {
        await prisma.user.create({
            data: {
                name,
                email,
                role: role || "USER",
                password, // In a real app, hash this!
            }
        });
    } catch (e) {
        console.error(e);
        return { message: "Failed to create user" };
    }

    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
}
