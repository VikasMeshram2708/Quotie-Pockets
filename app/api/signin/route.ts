import { DbConnect } from "@/helpers/Db";
import { prisma } from "@/helpers/Prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { UserLoginSchema } from "../models/UserLoginModel";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
  try {
    // get the data
    const data: SignInType = await req.json();
    const { email, password } = data;

    // sanitize the data
    UserLoginSchema.parse({ email, password });

    // connect to db
    await DbConnect();

    // check if the user already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!userExists) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is not registered.",
        },
        {
          status: 500,
        }
      );
    }

    // compare the hashed password
    const comparePassword = await bcrypt.compare(password, userExists.password);

    if (!comparePassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Password.",
        },
        {
          status: 500,
        }
      );
    }

    // user details
    const userDetails = {
      id: userExists?.id,
      email: userExists?.email,
      name: userExists?.name,
    };

    return NextResponse.json({
      success: true,
      message: "User is successfully logged in.",
      user: userDetails,
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
