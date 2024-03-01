import { Request, Response } from "express";
import QuotieSchema from "../models/quotie.model";
import { ZodError } from "zod";
import prisma from "../lib/Prisma";
import ConnectToDb from "../lib/Db";

export const QuotieController = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, author } = req.body;

    // sanitize the incoming data.
    QuotieSchema.parse({ title, slug, content, author });

    // connect to the database
    await ConnectToDb();

    // insert to the database
    const result = await prisma.quoties.create({
      data: {
        title,
        slug,
        content,
        author,
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
