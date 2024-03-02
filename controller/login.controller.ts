import { Request, Response } from "express";
import z, { ZodError } from "zod";
import ConnectToDb from "../lib/Db";
import prisma from "../lib/Prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import bcrypt from "bcryptjs";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5, {
    message: "Password must be at least 8 characters long.",
  }),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;
export const LoginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // sanitize the incoming data
    LoginSchema.parse({ email, password });

    // Connect to Db
    await ConnectToDb();

    // check if the user exists
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userExist) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized User.",
      });
    }

    // compare the password
    const matchPassword = await bcrypt.compare(password, userExist.password);

    if (!matchPassword) {
      return res.status(403).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    res.json({
      success: true,
      message: "Login successful.",
    });
  } catch (e) {
    const errorMessage = e as Error;

    if (e instanceof ZodError) {
      return res.status(500).json({
        success: false,
        message: e?.errors[0]?.message,
      });
    }

    if (e instanceof PrismaClientKnownRequestError) {
      return res.status(500).json({
        success: false,
        message: e?.message,
      });
    }

    return res.status(500).json({
      success: false,
      message: `Something went wrong : ${errorMessage?.message}`,
    });
  }
};
