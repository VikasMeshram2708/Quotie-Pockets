import { Request, Response } from "express";
import QuotieSchema from "../models/quotie.model";
import { ZodError } from "zod";
import prisma from "../lib/Prisma";
import ConnectToDb from "../lib/Db";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ObjectId } from "mongodb";

export const QuotieController = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, author, authorId } = req.body;

    // sanitize the incoming data.
    QuotieSchema.parse({ title, slug, content, author });

    // connect to the database
    await ConnectToDb();

    // check if the authorId exists
    const authorExist = await prisma.user.findUnique({
      where: {
        id: authorId,
      },
    });

    if (!authorExist) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized User.",
      });
    }

    // insert to the database
    const result = await prisma.quoties.create({
      data: {
        title,
        slug,
        content,
        author: {
          connect: {
            id: authorId,
          }
        },
      },
    });

    return res.status(200).json({
      success: true,
      result,
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
