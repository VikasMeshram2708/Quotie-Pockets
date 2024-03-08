"use client" ;

import { ReactNode } from "react";
import { CookiesProvider } from "react-cookie";

export default function CustomCookieProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CookiesProvider defaultSetOptions={{ path: "/" }}>
      {children};
    </CookiesProvider>
  );
}
