import Link from "next/link";
import { Bell, Search, User } from "lucide-react";

export function Header() {
    return (
        <header className="flex h-14 items-center gap-4 border-b bg-gray-50/40 px-6 dark:bg-zinc-900/40 lg:h-[60px]">
            <div className="w-full flex-1">
                <form>
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search assets..."
                            className="w-full appearance-none bg-background pl-8 shadow-none border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </form>
            </div>
            <button className="rounded-full border p-2 bg-gray-100 dark:bg-zinc-800">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
            </button>
            <button className="rounded-full border p-2 bg-gray-100 dark:bg-zinc-800">
                <User className="h-4 w-4" />
                <span className="sr-only">User menu</span>
            </button>
        </header>
    );
}
