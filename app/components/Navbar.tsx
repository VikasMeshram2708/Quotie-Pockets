"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Navbar() {
  const router = useRouter();
  const [cookie] = useCookies(["QuotieAuth"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (cookie?.QuotieAuth !== undefined) {
      setIsAuthenticated(true);
    }
    console.log("cookie", cookie?.QuotieAuth);
  }, [cookie]);

  // Logout Function
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout");
      const result = await response.json();
      if (!response.ok) {
        return alert(result?.message);
      }
      alert(result?.message);
      return router.push("/");
    } catch (e) {
      const err = e as Error;
      return alert(err?.message);
    }
  };

  return (
    <nav className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Use</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="text-xl font-Pacifico text-[1.7rem]">
          Quotie Pockets
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About Us</Link>
          </li>{" "}
          <li>
            <Link href="/contact">Contact Us</Link>
          </li>{" "}
          <li>
            <Link href="/privacy">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/terms">Terms of Use</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {!isAuthenticated && (
          <button className="btn btn-active btn-ghost">
            <Link href="/signin">Login</Link>
          </button>
        )}

        {isAuthenticated && (
          <button onClick={handleLogout} className="btn btn-active btn-ghost">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
