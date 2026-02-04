import { NextResponse } from "next/server";

export async function GET() {
    try {
        const sheetRes = await fetch("https://docs.google.com/spreadsheets/d/1nCYkK0Y5RGmjHG2X1CyC-ENAVgmufzDxp97fJWC1jTs/export?format=csv", { cache: 'no-store' });
        const text = await sheetRes.text();
        const lines = text.split("\n").map(l => l.trim()).filter(l => l !== "");

        let count = 0;
        if (lines.length > 1) {
            count = parseInt(lines[1]) || 0;
        }

        return NextResponse.json({
            raw: text,
            parsedLines: lines,
            detectedCount: count
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
