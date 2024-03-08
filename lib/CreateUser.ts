"use server";

import { DbConnect } from "@/helpers/Db";
import { prisma } from "@/helpers/Prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as z from "zod";
import bcrypt from "bcryptjs";

const UserSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters long",
    })
    .max(150, {
      message: "Name must be at least 150 characters long",
    }),
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

type UserSchema = z.infer<typeof UserSchema>;

export const handleSignUp = async (data: FormData) => {
  try {
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");

    console.log("sign-up-data", { name, email, password });

    //   Sanitize the data
    UserSchema.parse({ name, email, password });

    // check if the email is already in use.
    const userExist = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (userExist) {
      return console.log("Email is already in use.");
    }

    // connect to db
    await DbConnect();

    // hash the password
    const hashedPassword = await bcrypt.hash(password as string, 10);

    // insert to db
    return await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: hashedPassword,
      },
    });
  } catch (e) {
    const err = e as Error;
    if (e instanceof PrismaClientKnownRequestError) {
      console.log("Something went wrong. Prisma Error : ", e.message);
    }
    if (e instanceof z.ZodError) {
      console.log("Something went wrong. Zod Error : ", e.errors[0].message);
    }
    console.log(
      `Something went wrong. Failed to Create the user. : ${err?.message}`
    );
  }
};
