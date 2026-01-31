
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card title="Total Assets" value="1,234" icon={DollarSign} subtext="+20.1% from last month" />
                <Card title="Active Users" value="+2350" icon={Users} subtext="+180.1% from last month" />
                <Card title="Maintenance" value="+12,234" icon={CreditCard} subtext="+19% from last month" />
                <Card title="Available" value="+573" icon={Activity} subtext="+201 since last hour" />
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4 rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
                    <p className="text-sm text-muted-foreground mt-2">Latest asset movements and updates.</p>
                    {/* Placeholder for chart/table */}
                    <div className="mt-4 h-[200px] w-full bg-muted/20 rounded-md flex items-center justify-center text-muted-foreground">
                        Chart Placeholder
                    </div>
                </div>
                <div className="col-span-3 rounded-xl border bg-card text-card-foreground shadow-sm p-6">
                    <h3 className="font-semibold leading-none tracking-tight">Recent Allocation</h3>
                    <p className="text-sm text-muted-foreground mt-2">Recently assigned assets.</p>
                    {/* Placeholder for list */}
                    <div className="mt-4 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-muted" />
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">MacBook Pro M3</p>
                                <p className="text-sm text-muted-foreground">Assigned to Alex</p>
                            </div>
                            <div className="ml-auto font-medium">Just now</div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-muted" />
                            <div className="grid gap-1">
                                <p className="text-sm font-medium leading-none">Dell XPS 15</p>
                                <p className="text-sm text-muted-foreground">Assigned to Sarah</p>
                            </div>
                            <div className="ml-auto font-medium">2h ago</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Card({ title, value, icon: Icon, subtext }: any) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow-sm p-6">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="tracking-tight text-sm font-medium">{title}</h3>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="pt-0">
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{subtext}</p>
            </div>
        </div>
    );
}
