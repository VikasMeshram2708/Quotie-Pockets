import { DbConnect } from "@/helpers/Db";
import { prisma } from "@/helpers/Prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import { UserSchema } from "../models/UserModel";
import bcrypt from "bcryptjs";

export const POST = async (req: NextRequest) => {
  try {
    // get the data
    const data: UserType = await req.json();
    const { name, email, password } = data;

    // sanitize the data
    UserSchema.parse({ name, email, password });

    // connect to db
    await DbConnect();

    // check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered.",
        },
        {
          status: 500,
        }
      );
    }

    // incrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // insert to the database
    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User is successfully registered.",
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
