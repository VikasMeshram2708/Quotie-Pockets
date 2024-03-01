import { MongoClient } from "mongodb";

const { DATABASE_URL, DATABASE_NAME, DATABASE_CONTACT_COLLECTION } =
  process.env;

if (!DATABASE_URL) throw new Error("Database connection URI not provided.");

export const client = new MongoClient(DATABASE_URL!);
export const db = client.db(DATABASE_NAME);
