import { prisma } from "@/lib/prisma";
import { Plus } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function AssetsPage() {
    const assets = await prisma.asset.findMany({
        orderBy: { createdAt: "desc" },
        include: { assignedTo: true },
    });

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Assets</h1>
                <Link
                    href="/dashboard/assets/new"
                    className="inline-flex items-center justify-center rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-50 shadow hover:bg-zinc-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90 dark:focus-visible:ring-zinc-300"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Asset
                </Link>
            </div>

            <div className="rounded-md border shadow-sm">
                <div className="w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Asset Tag</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Assigned To</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {assets.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">No assets found.</td>
                                </tr>
                            ) : (
                                assets.map((asset) => (
                                    <tr key={asset.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                        <td className="p-4 align-middle font-medium">{asset.assetTag}</td>
                                        <td className="p-4 align-middle">{asset.name}</td>
                                        <td className="p-4 align-middle">{asset.type}</td>
                                        <td className="p-4 align-middle">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${asset.status === "AVAILABLE"
                                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                                        : asset.status === "ASSIGNED"
                                                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                                            : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                                                    }`}
                                            >
                                                {asset.status}
                                            </span>
                                        </td>
                                        <td className="p-4 align-middle">{asset.assignedTo?.name || "-"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
