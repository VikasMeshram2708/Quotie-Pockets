import * as z from "zod";

export const QuotiesSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(150, {
      message: "Name must be at least 150 characters long",
    }),
  slug: z
    .string()
    .min(2, {
      message: "Slug must be at least 2 characters long",
    })
    .max(150, {
      message: "Slug must be at least 150 characters long",
    }),
  message: z
    .string()
    .min(2, {
      message: "Message must be at least 2 characters long",
    })
    .max(150, {
      message: "Message must be at least 150 characters long",
    }),
  author: z.string(),
});

type QuotiesSchema = z.infer<typeof QuotiesSchema>;
