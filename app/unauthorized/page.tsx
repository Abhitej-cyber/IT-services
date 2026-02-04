export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold text-destructive">Access Denied</h1>
                <p className="text-muted-foreground">
                    You don't have permission to access this page.
                </p>
                <a
                    href="/login"
                    className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
                >
                    Back to Login
                </a>
            </div>
        </div>
    );
}
