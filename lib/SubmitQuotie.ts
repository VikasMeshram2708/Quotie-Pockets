"use server";

import { DbConnect } from "@/helpers/Db";
import { prisma } from "@/helpers/Prisma";
import { ObjectId } from "mongodb";
import slugify from "slugify";
import * as z from "zod";

const QuotieSchema = z.object({
  quotieTitle: z
    .string()
    .min(2, {
      message: "Quotie's title should contain at least 2 characters.",
    })
    .max(250, {
      message: "Quotie's message should not exceed more than 250 characters.",
    }),
});

type QuotieSchema = z.infer<typeof QuotieSchema>;

export const SubmitQuotie = async (data: FormData) => {
  const quotieTitle = data.get("title");
  const quotieMessage = data.get("message");

  const _data = {
    quotieTitle,
    quotieMessage,
  };

  // sanitize the data
  QuotieSchema.parse(_data);

  // connect to db
  await DbConnect();

  // insert to db
  await prisma.quoties.create({
    data: {
      title: _data?.quotieTitle as string,
      message: _data?.quotieMessage as string,
      slug: slugify(_data?.quotieTitle as string),
      author: {
        connect: {
          id: "65e9d356132f906de4e26ba2",
        },
      },
    },
  });

  console.log("received", _data);
};


// DATABASE_URL="mongodb+srv://ShivAnshVikas0p:ShivAnshVikas0p@bharatbuzzfeed.byknl6w.mongodb.net/Quoties2?retryWrites=true&w=majority&appName=BharatBuzzFeed"
