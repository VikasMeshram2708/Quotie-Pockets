import * as z from "zod";

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters long",
    })
    .max(200, {
      message: "Password must be at least 200 characters long",
    }),
});

type UserLoginSchema = z.infer<typeof UserLoginSchema>;
