import { Request, Response } from "express";
import { ContactCollection } from "../models/contact.model";

export const ContactRegisteredController = async (req: Request, res: Response) => {
  try {
    const result = await ContactCollection.find({}).toArray();
    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(
      `Failed to retrive the emails : ${
        error instanceof Error && error?.message
      }`
    );
  }
};
