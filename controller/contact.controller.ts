import { Request, Response } from "express";
import { ContactCollection, ContactSchema } from "../models/contact.model";

export const ContactController = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    // Sanitize the incomding data.
    // Check if the email already exist or not
    const emailExist = await ContactCollection.findOne({
      email,
    });

    if (emailExist) throw new Error("Email already in use.");
    ContactSchema.parse({ name, email, message });
    const result = await ContactCollection.insertOne({
      name,
      email,
      message,
    });
    res
      .json({
        success: true,
        result,
      })
      .status(200);
  } catch (e) {
    const errorMessage = e as Error;
    res
      .json({
        message: `Something went wrong : ${errorMessage?.message}`,
      })
      .status(500);
  }
};
