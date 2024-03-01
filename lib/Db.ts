import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma from "./Prisma";

const ConnectToDb = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to DB Successfully.");
  } catch (e) {
    const err = e as Error;
    if (err instanceof PrismaClientKnownRequestError) {
      console.log(`Failed to connect to DB : ${err?.message}`);
    } else {
      console.log(`Failed to connect to DB : ${err?.message}`);
    }
  } finally {
    await prisma.$disconnect();
    console.log("Connection closed.");
  }
};

export default ConnectToDb;
