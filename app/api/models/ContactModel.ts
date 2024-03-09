import * as z from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(150, {
      message: "Name must be at least 150 characters long",
    }),
  email: z.string().email(),
  message: z
    .string()
    .min(2, {
      message: "Message must be at least 2 characters long",
    })
    .max(150, {
      message: "Message must be at least 150 characters long",
    }),
});

export type ContactSchema = z.infer<typeof ContactSchema>;
