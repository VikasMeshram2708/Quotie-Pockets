import { prisma } from "@/helpers/Prisma";

export const DbConnect = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB Successfully.");
  } catch (e) {
    const err = e as Error;
    console.log("Something went wrong. Db Connection failed", err?.message);
  } finally {
    await prisma.$disconnect();
    console.log("Connection was relesed.");
  }
};
