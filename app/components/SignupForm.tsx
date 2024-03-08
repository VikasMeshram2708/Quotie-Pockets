"use client";

import { handleSignUp } from "@/lib/CreateUser";
import { useRef } from "react";

export default function SignupForm() {
  const ref = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={ref}
      action={async (formData) => {
        await handleSignUp(formData);
        ref.current?.reset();
      }}
      className="border-2 border-accent rounded mt-10 max-w-sm mx-auto p-5 grid gap-5"
    >
      {/* name */}
      <div className="grid gap-3">
        <label htmlFor="name">Name</label>
        <input
          name="name"
          className="p-2 rounded outline outline-accent"
          type="text"
          placeholder="Enter name"
        />
      </div>

      {/* email */}
      <div className="grid gap-3">
        <label htmlFor="email">Email</label>
        <input
          name="email"
          className="p-2 rounded outline outline-accent"
          type="email"
          placeholder="Enter email"
        />
      </div>

      {/* password */}
      <div className="grid gap-3">
        <label htmlFor="password">Password</label>
        <input
          name="password"
          className="p-2 rounded outline outline-accent"
          type="password"
          placeholder="Enter password"
        />
      </div>

      {/* button */}
      <div>
        <button type="submit" className="btn btn-accent">
          Sign Up
        </button>
      </div>
    </form>
  );
}
