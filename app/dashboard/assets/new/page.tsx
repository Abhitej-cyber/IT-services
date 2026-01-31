import { createAsset } from "@/app/actions";

export default function NewAssetPage() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Add New Asset</h1>
            <form action={createAsset} className="space-y-4">
                <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Asset Name</label>
                    <input type="text" name="name" id="name" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="assetTag" className="text-sm font-medium">Asset Tag</label>
                    <input type="text" name="assetTag" id="assetTag" required className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="type" className="text-sm font-medium">Type</label>
                    <select name="type" id="type" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="LAPTOP">Laptop</option>
                        <option value="MONITOR">Monitor</option>
                        <option value="PERIPHERAL">Peripheral</option>
                        <option value="LICENSE">License</option>
                    </select>
                </div>

                <div className="grid gap-2">
                    <label htmlFor="serialNumber" className="text-sm font-medium">Serial Number</label>
                    <input type="text" name="serialNumber" id="serialNumber" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" />
                </div>

                <div className="grid gap-2">
                    <label htmlFor="status" className="text-sm font-medium">Status</label>
                    <select name="status" id="status" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="AVAILABLE">Available</option>
                        <option value="ASSIGNED">Assigned</option>
                        <option value="MAINTENANCE">Maintenance</option>
                        <option value="RETIRED">Retired</option>
                    </select>
                </div>

                <button type="submit" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900">
                    Create Asset
                </button>
            </form>
        </div>
    );
}
