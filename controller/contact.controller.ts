import { Request, Response } from "express";
import { ContactCollection, ContactSchema } from "../models/contact.model";

export const ContactController = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    const emailExist = await ContactCollection.findOne({
      email,
    });

    if (emailExist) {
      return res.status(500).json({
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
    res.status(500).json({
      message: `Something went wrong : ${errorMessage?.message}`,
    });
  }
};
