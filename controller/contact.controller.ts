import { Request, Response } from "express";
import ContactSchema from "../models/contact.model";
import { ZodError } from "zod";
import prisma from "../lib/Prisma";
import ConnectToDb from "../lib/Db";

export const ContactController = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    // connect to DB
    await ConnectToDb();

    // validate the unique email.
    const emailExist = await prisma.contactUs.findUnique({
      where: {
        email,
      },
    });

    if (emailExist) {
      return res.status(422).json({
        success: false,
        message: "Email already in use.",
      });
    }
    // sanitize the incominmg data.
    ContactSchema.parse({ name, email, message });

    // insert to the database
    const result = await prisma.contactUs.create({
      data: {
        name,
        email,
        message,
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
