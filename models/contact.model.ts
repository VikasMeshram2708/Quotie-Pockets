import * as z from "zod";

import { db } from "../utils/ConnectToDb";

const { DATABASE_CONTACT_COLLECTION } = process.env;

if (!DATABASE_CONTACT_COLLECTION)
  throw new Error("Please provided contact collection name.");

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be more than one character.",
    })
    .max(150, {
      message: "Name maximum length must be 150 characters..",
    }),
  email: z.string().email(),
  message: z
    .string()
    .min(2, {
      message: "Message must be more than one character.",
    })
    .max(150, {
      message: "Message maximum length must be 150 characters..",
    }),
});

export type ContactSchema = z.infer<typeof ContactSchema>;

export const ContactCollection = db.collection<ContactSchema>(
  DATABASE_CONTACT_COLLECTION
);
