import * as z from "zod";

export const QuotieSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Name must be more than one character.",
    })
    .max(150, {
      message: "Name maximum length must be 150 characters..",
    }),
  content: z
    .string()
    .min(2, {
      message: "Content must be more than one character.",
    })
    .max(250, {
      message: "Content maximum length must be 250 characters..",
    }),
  author: z
    .string()
    .min(2, {
      message: "Author must be more than one character.",
    })
    .max(150, {
      message: "Author maximum length must be 150 characters.",
    }),
});

export default QuotieSchema;
