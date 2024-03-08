"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { UserSchema } from "../api/models/UserModel";
import Link from "next/link";

export default function SigninForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignInType>();

  const handleSignup: SubmitHandler<SignInType> = async (data) => {
    try {
      // sanitie the data
      UserSchema.parse(data);
      console.log("data", data);

      // Hit the api
      //   const response = await fetch("/api/signup", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //   });

      //   const result = await response.json();
      //   if (!response.ok) {
      //     return alert(result?.message);
      //   }

      // console.log("user-data", data);

      // reset the form
      reset();

      //   return alert(result?.message);
    } catch (e) {
      const err = e as Error;
      if (e instanceof z.ZodError) {
        return alert(e.errors[0].message);
      }
      return alert(err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSignup)}
      className="border-2 border-accent rounded mt-10 max-w-sm mx-auto p-5 grid gap-5"
    >
      <h1 className="text-center text-xl">Sign In</h1>

      {/* email */}
      <div className="grid gap-3">
        <label htmlFor="email">Email</label>
        <input
          className="p-2 rounded outline outline-accent"
          type="email"
          placeholder="Enter email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required",
            },
          })}
        />
        {errors?.email && (
          <p className="text-red-500 font-semibold">{errors?.email?.message}</p>
        )}
      </div>

      {/* password */}
      <div className="grid gap-3">
        <label htmlFor="password">Password</label>
        <input
          className="p-2 rounded outline outline-accent"
          type="password"
          placeholder="Enter password"
          {...register("password", {
            min: {
              value: 5,
              message: "Password must be at least 2 characters long",
            },
            max: {
              value: 200,
              message: "Password must be at least 150 characters long",
            },
            required: {
              value: true,
              message: "Password is required",
            },
          })}
        />
        {errors?.password && (
          <p className="text-red-500 font-semibold">
            {errors?.password?.message}
          </p>
        )}
      </div>

      {/* button */}
      <div>
        <button type="submit" className="btn btn-accent">
          Sign In
        </button>
        <p className="mt-5">
          Not a User ?{" "}
          <span>
            <Link className="hover:underline" href="/signup">
              Sign Up
            </Link>
          </span>
        </p>
      </div>
    </form>
  );
}
