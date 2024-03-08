import { usePathname, useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const protectedPath = "/quoties";
  const path = request.nextUrl.pathname;
  const cookieData = request.cookies.get("QuotieAuth")?.value || "";
  console.log("current-paht", path);
  //   console.log("cookie-data", JSON.parse(cookieData));

  if (protectedPath && cookieData) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/signin", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/quoties",
};
