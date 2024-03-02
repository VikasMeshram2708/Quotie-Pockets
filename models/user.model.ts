import * as z from "zod";

export const UserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be more than one character.",
    })
    .max(150, {
      message: "Name maximum length must be 150 characters..",
    }),
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Author must be more than one character.",
    })
    .max(150, {
      message: "Author maximum length must be 150 characters.",
    }),
});

export default UserSchema;
