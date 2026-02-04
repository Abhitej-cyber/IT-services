import { prisma } from "../lib/db";

async function main() {
    console.log("Prisma Client Keys:", Object.keys(prisma).filter(k => !k.startsWith("_")));
}

main();
