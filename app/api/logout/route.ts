import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  try {
    // destroy the cookie
    // const cookie = req.cookies;
    // cookie().delete("QuotieAuth");

    cookies().delete("QuotieAuth");
    NextResponse.redirect(new URL("/signin", req.url));

    
    revalidatePath("/");
    return NextResponse.json({
      success: true,
      message: "Logout Successfull.",
    });
  } catch (e) {
    const err = e as Error;
    return NextResponse.json(
      {
        succes: false,
        message: err?.message,
      },
      {
        status: 500,
      }
    );
  }
};
