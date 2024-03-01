import * as z from "zod";

const ContactSchema = z.object({
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

export default ContactSchema;
