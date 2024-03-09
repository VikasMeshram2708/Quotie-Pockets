"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { QuotiesSchema } from "../api/models/QuotiesModel";
import slugify from "slugify";


export default function QuotieForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuotieType>();

  const handleQuoties: SubmitHandler<QuotieType> = (data) => {
    try {
      const { title, message } = data;
      const slug = slugify(title);

      const quotiesData = {
        title,
        slug,
        message,
        author: "65eadc861cdc44d32f3137e7",
      };

      QuotiesSchema.parse(quotiesData);
      console.log("quoties", quotiesData);
      return reset();
    } catch (e) {
      const err = e as Error;
      if (e instanceof z.ZodError) {
        return alert(e.errors[0].message);
      }
      return alert(err.message);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(handleQuoties)}
        className="mt-10 max-w-2xl mx-auto p-5 grid gap-5"
      >
        <div className="grid gap-3">
          <input
            type="text"
            className="p-2 rounded"
            placeholder="Enter title"
            {...register("title", {
              min: {
                value: 2,
                message: "Title must be at least 2 characters long",
              },
              max: {
                value: 150,
                message: "Title must be at least 150 characters long",
              },
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          />
          {errors?.title && (
            <p className="text-red-500 font-semibold">
              {errors?.title?.message}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <textarea
            className="p-2 rounded"
            placeholder="Enter message"
            rows={5}
            {...register("message", {
              min: {
                value: 2,
                message: "Title must be at least 2 characters long",
              },
              max: {
                value: 150,
                message: "Title must be at least 150 characters long",
              },
              required: {
                value: true,
                message: "Title is required",
              },
            })}
          ></textarea>
          {errors?.message && (
            <p className="text-red-500 font-semibold">
              {errors?.message?.message}
            </p>
          )}
        </div>

        <button type="submit" className="btn btn-primary-200 border">
          Submit
        </button>
      </form>
    </>
  );
}
