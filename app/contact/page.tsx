"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { ContactSchema } from "../api/models/ContactModel";
import * as z from "zod";
import { UserSchema } from "../api/models/UserModel";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactSchema>();

  const handleContact: SubmitHandler<ContactSchema> = async (data) => {
    try {
      console.log("data", data);
      UserSchema.parse(data);
    } catch (e) {
      const err = e as Error;
      if (e instanceof z.ZodError) {
        return alert(e.errors[0].message);
      }
      return alert(err?.message);
    }
  };
  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-white text-4xl text-center mt-10">Contact Us</h1>

      <form
        onSubmit={handleSubmit(handleContact)}
        className="grid gap-5 p-8 rounded-lg text-white shadow-lg"
      >
        <div className="grid gap-3">
          <label htmlFor="name" className="text-lg">
            Name
          </label>
          <input
            type="text"
            className="outline-none border-4 border-[--pprl] p-3 rounded"
            placeholder="Enter name"
            {...register("name", {
              min: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
              max: {
                value: 150,
                message: "Name must be at least 150 characters long",
              },
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
          {errors?.name && (
            <p className="text-red-500 font-semibold">
              {errors?.name?.message}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <label htmlFor="email" className="text-lg">
            Email
          </label>
          <input
            type="email"
            className="outline-none border-4 border-[--pprl] p-3 rounded"
            placeholder="Enter email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
            })}
          />
          {errors?.email && (
            <p className="text-red-500 font-semibold">
              {errors?.email?.message}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <label htmlFor="message" className="text-lg">
            Message
          </label>
          <textarea
            className="outline-none border-4 border-[--pprl] p-3 rounded"
            rows={5}
            placeholder="Enter message"
            {...register("message", {
              min: {
                value: 2,
                message: "Message must be at least 2 characters long",
              },
              max: {
                value: 150,
                message: "Message must be at least 150 characters long",
              },
              required: {
                value: true,
                message: "Message is required",
              },
            })}
          ></textarea>
          {errors?.message && (
            <p className="text-red-500 font-semibold">
              {errors?.message?.message}
            </p>
          )}
        </div>
        <div>
          <button
            type="submit"
            className="border-4 border-[--pprl] hover:bg-[--pprl] text-white font-semibold py-3 px-6 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
