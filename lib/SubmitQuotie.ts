"use server";

import * as z from "zod";


export const SubmitQuotie = async (data: FormData) => {
  const quotieTitle = data.get("title");
  const quotieMessage = data.get("message");

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

  const _data = {
    quotieTitle,
    quotieMessage,
  };

  QuotieSchema.parse(_data);

  console.log("received", _data);

  // sanitize the data
  // connect to db
  // insert to db
};
