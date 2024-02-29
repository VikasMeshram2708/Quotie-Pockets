import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
const URL = import.meta.env.VITE_BASE_URL;
import * as z from "zod";

type InputType = {
  name: string;
  email: string;
  message: string;
};

const ContactSchema = z.object({
  name: z.string().min(2).max(150),
  email: z.string().email(),
  message: z.string().min(5).max(250),
});

type ContactSchema = z.infer<typeof ContactSchema>;

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    try {
      ContactSchema.parse(data);
      const response = await fetch(`${URL}/api/contact-us`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.status !== 200) {
        return toast.error(result.message);
      }
      console.log("res", result);
      reset();
      return toast.success(
        "Thank your for connecting with us our tema will connect with you shortly."
      );
    } catch (e) {
      const err = e as Error;
      if (e instanceof z.ZodError) {
        toast.error(e.errors[0].message);
      } else {
        toast.error(
          `Something went wrong. Failed to submit the form : ${err?.message}`
        );
      }
    }
  };

  return (
    <section className="max-w-2xl mx-auto mt-24">
      <h1 className="text-5xl text-center mb-10">Contact Us</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 p-5"
      >
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input
              className="outline-none w-full p-3 rounded"
              type="text"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <p className="text-red-500 font-semibold">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <input
              className="outline-none p-3 rounded w-full"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 font-semibold">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <textarea
            rows={5}
            className="w-full p-2 outline-none rounded"
            placeholder="Message"
            {...register("message", {
              required: "Message is required",
              minLength: {
                value: 2,
                message: "Message must be at least 2 characters",
              },
            })}
          ></textarea>
          {errors.message && (
            <p className="text-red-500 font-semibold">
              {errors.message.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          className="hover:bg-[--my-purple] bg-purple-700 px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      <Toaster />
    </section>
  );
}
