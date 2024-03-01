import { Request, Response } from "express";
// import { ContactCollection, ContactSchema } from "../models/contact.model";
import { QuotieSchema, QuotieCollection } from "../models/quotie.model";
import { ZodError } from "zod";

export const QuotieController = async (req: Request, res: Response) => {
  try {
    const { title, content, author } = req.body;

    QuotieSchema.parse({ title, content, author });
    const result = await QuotieCollection.insertOne({
      title,
      content,
      author,
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
