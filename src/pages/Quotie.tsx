import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";

// type QuotiesType = {
//   title: string;
//   message: string;
// };

const QuotieSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters long",
    })
    .max(150, {
      message: "Title must be at most 150 characters long",
    }),
  message: z
    .string()
    .min(5, {
      message: "Message must be at least 5 characters long",
    })
    .max(250, {
      message: "Message must be at most 250 characters long",
    }),
});

type QuotiesType = z.infer<typeof QuotieSchema>;
export default function Quotie() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuotiesType>();
  const handleForm: SubmitHandler<QuotiesType> = (data) => {
    try {
      QuotieSchema.parse(data);
      console.log("quotie-data", data);
    } catch (e) {
      const err = e as Error;
      if (e instanceof z.ZodError) {
        return alert(e?.errors[0]?.message);
      } else {
        return alert(err?.message);
      }
    }
  };
  return (
    <section className="max-w-2xl mx-auto mt-24">
      <form onSubmit={handleSubmit(handleForm)} className="grid gap-5">
        <div className="grid gap-3 text-white">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            inputMode="text"
            className="outline-none border-2 border-[--pprl] p-2 rounded"
            autoFocus
            placeholder="Enter text"
            {...register("title", {
              min: {
                value: 2,
                message: "Title must be at least",
              },
              max: {
                value: 150,
                message: "Title must be at most",
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
        <div className="grid text-white gap-3">
          <label htmlFor="message">Message</label>
          <textarea
            inputMode="text"
            placeholder="Enter message"
            className="outline-none border-2 border-[--pprl] p-2 rounded"
            autoFocus
            rows={5}
            {...register("message", {
              min: {
                value: 2,
                message: "Message must be at least",
              },
              max: {
                value: 250,
                message: "Message must be at most",
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
            className="px-4 py-2 bg-pink-500 font-semibold text-[1.2rem] text-white rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}
