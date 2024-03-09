import { DbConnect } from "@/helpers/Db";
import { prisma } from "@/helpers/Prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { QuotiesSchema } from "../models/QuotiesModel";

export const POST = async (req: NextRequest) => {
  try {
    // get the data
    const data: QuotieType = await req.json();
    const { title, slug, message, author } = data;

    // sanitize the data
    QuotiesSchema.parse({ title, slug, message, author });

    // connect to db
    await DbConnect();

    await prisma.quoties.create({
      data: {
        title: title,
        message: message,
        slug: slug,
        author: {
          connect: {
            id: author,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Quote has been successfully created.",
    });
  } catch (e) {
    const err = e as Error;
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: e?.errors[0]?.message,
        },
        {
          status: 500,
        }
      );
    }
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        // Handle unique constraint violation
        const targetField = e.meta?.target;

        if (targetField === "Quoties_slug_key") {
          return NextResponse.json(
            {
              success: false,
              message:
                "This slug is already taken. Please choose a different slug.",
            },
            {
              status: 500,
            }
          );
        }
      }

      return NextResponse.json(
        {
          success: false,
          message: e?.message,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: err?.message,
      },
      {
        status: 500,
      }
    );
  }
};
