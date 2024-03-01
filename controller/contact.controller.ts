import { Request, Response } from "express";
import { ContactCollection, ContactSchema } from "../models/contact.model";
import { ZodError } from "zod";

export const ContactController = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const emailExist = await ContactCollection.findOne({
      email,
    });

    if (emailExist) {
      return res.status(422).json({
        success: false,
        message: "Email already in use.",
      });
    }
    ContactSchema.parse({ name, email, message });
    const result = await ContactCollection.insertOne({
      name,
      email,
      message,
    });
    return res.status(200).json({
      success: true,
      result,
    });
  } catch (e) {
    const errorMessage = e as Error;
    if (e instanceof ZodError) {
      res.status(500).json({
        message: e?.errors[0]?.message,
      });
    } else {
      res.status(500).json({
        message: `Something went wrong : ${errorMessage?.message}`,
      });
    }
  }
};
