import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import * as z from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Password must be at least 5 characters long",
    })
    .max(150, {
      message: "Password should not exceed more than 150 characters.",
    }),
});

type LoginSchemaType = z.infer<typeof LoginSchema>;

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>();

  const handleLogin: SubmitHandler<LoginSchemaType> = (data) => {
    try {
      LoginSchema.parse(data);
      console.log("received login", data);
    } catch (e) {
      const err = e instanceof Error;
      if (e instanceof z.ZodError) {
        toast.error(e?.errors[0]?.message);
      } else {
        toast.error(`Something went wrong :${err}`);
      }
    }
  };

  return (
    <section className="mt-24">
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="border border-[--my-purple] grid p-5 rounded gap-3 items-center"
        >
          <div className="flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="p-2 text-[1.3rem] rounded outline-none"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors?.email && (
              <p className="text-red-500 font-semibold">
                {errors?.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              placeholder="Enter password"
              className="p-2 text-[1.3rem] rounded outline-none"
              {...register("password", {
                min: {
                  value: 5,
                  message: "Password must be at least 5 characters long",
                },
                max: {
                  value: 150,
                  message:
                    "Password should not exceed more than 150 characters.",
                },
                required: "Password is required",
              })}
            />
            {errors?.password && (
              <p className="text-red-500 font-semibold">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-accent font-semibold rounded"
          >
            Login
          </button>
        </form>
      </div>
      <Toaster />
    </section>
  );
}
