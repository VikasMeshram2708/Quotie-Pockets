import * as z from "zod";

import { db } from "../utils/ConnectToDb";

const { DATABASE_CONTACT_COLLECTION } = process.env;

if (!DATABASE_CONTACT_COLLECTION)
  throw new Error("Please provided contact collection name.");

export const ContactSchema = z.object({
  name: z.string().min(2).max(150),
  email: z.string().email(),
  message: z.string().min(5).max(250),
});

export type ContactSchema = z.infer<typeof ContactSchema>;

export const ContactCollection = db.collection<ContactSchema>(
  DATABASE_CONTACT_COLLECTION
);
