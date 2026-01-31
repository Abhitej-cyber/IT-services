import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link"; // Corrected import to Link (unused import removed in next step if checking lint)

export default async function UsersPage() {
    // Basic user list implementation
    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { assets: true } } },
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Users</h1>
                {/* Add User Button could go here */}
            </div>
            <div className="rounded-md border shadow-sm">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                        <tr className="border-b transition-colors hover:bg-muted/50">
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Assets Assigned</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr><td colSpan={4} className="p-4 text-center">No users found.</td></tr>
                        ) : (
                            users.map(user => (
                                <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{user.name}</td>
                                    <td className="p-4 align-middle">{user.email}</td>
                                    <td className="p-4 align-middle">{user.role}</td>
                                    <td className="p-4 align-middle">{user._count.assets}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
