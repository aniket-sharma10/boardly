import "server-only";
import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("Missing env var: DATABASE_URL");
}

export const db =
  globalForPrisma.prisma || new PrismaClient({ adapter: new PrismaPg(databaseUrl) });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
