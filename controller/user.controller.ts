import { Request, Response } from "express";
import UserSchema from "../models/user.model";
import { ZodError } from "zod";
import prisma from "../lib/Prisma";
import ConnectToDb from "../lib/Db";
import bcrypt from "bcryptjs";

export const UserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // sanitize the incoming data.
    UserSchema.parse({ name, email, password });

    // connect to the database
    await ConnectToDb();

    // incrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert to the database
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    const errorMessage = e as Error;
    if (e instanceof ZodError) {
      res.status(500).json({
        success: false,
        message: e?.errors[0]?.message,
      });
    } else {
      res.status(500).json({
        success: false,
        message: `Something went wrong : ${errorMessage?.message}`,
      });
    }
  }
};
