import { SubmitHandler, useForm } from "react-hook-form";

type InputType = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit: SubmitHandler<InputType> = (data) => {
    console.log("data", data);
    reset();
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
    </section>
  );
}
