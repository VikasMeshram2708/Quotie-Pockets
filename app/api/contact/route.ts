import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { ContactSchema } from "../models/ContactModel";
import { DbConnect } from "@/helpers/Db";
import { prisma } from "@/helpers/Prisma";

export const POST = async (req: NextRequest) => {
  try {
    const reqBody: ContactType = await req.json();
    const { name, email, message } = reqBody;

    // sanitize the  incoming data.
    ContactSchema.parse({ name, email, message });

    // connect to db
    await DbConnect();

    // check if the email is already in use.
    const userExist = await prisma.contact.findUnique({
      where: {
        email: email,
      },
    });

    if (userExist) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already in use.",
        },
        {
          status: 500,
        }
      );
    }

    // insert to db
    await prisma.contact.create({
      data: {
        name: name,
        email: email,
        message: message,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully.",
    });
  } catch (e) {
    const err = e as Error;
    if (e instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: e.errors,
          success: false,
        },
        {
          status: 500,
        }
      );
    }
    if (e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          message: e.message,
          success: false,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        message: err?.message,
        success: false,
      },
      {
        status: 500,
      }
    );
  }
};
