import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { RiDeleteBinFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";

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

type QuotiesList = {
  id: number;
  data: {
    title: string;
    message: string;
  };
};
type QuotiesType = z.infer<typeof QuotieSchema>;
export default function Quotie() {
  const [quoties, setQuoties] = useState<QuotiesList[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingQuote, setEditingQuote] = useState<QuotiesList | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuotiesType>();

  const handleForm: SubmitHandler<QuotiesType> = async (data) => {
    try {
      QuotieSchema.parse(data);
      // console.log("quotie-data", data);
      reset();
      const QuotesData: QuotiesList = {
        id: Math.floor(1000 + Math.random() * 9000),
        data,
      };
      setQuoties((prev) => [...prev, QuotesData]);
    } catch (e) {
      const err = e as Error;
      if (e instanceof z.ZodError) {
        return alert(e?.errors[0]?.message);
      } else {
        return alert(err?.message);
      }
    }
  };

  const handleDelete = (quoteId: number) => {
    const newQuotes = quoties?.filter((quote: any) => quote?.id !== quoteId);
    setQuoties(newQuotes);
  };

  const handleEdit = (quote: QuotiesList) => {
    setIsEditing(true);
    setEditingQuote(quote);
  };

  const handleEditForm: SubmitHandler<QuotiesType> = async (data) => {
    try {
      QuotieSchema?.parse(data);
      if (editingQuote) {
        const updatedQuotes = quoties?.map((quote) =>
          quote?.id === editingQuote?.id ? { ...quote, data } : quote
        );
        setQuoties(updatedQuotes);
        setIsEditing(false);
        setEditingQuote(null);
        reset();
      }
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
    <section className="max-w-[90%] mx-auto mt-24">
      <form
        onSubmit={handleSubmit(isEditing ? handleEditForm : handleForm)}
        className="grid gap-5 max-w-xl mx-auto"
      >
        <div className="grid gap-3 text-white">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            inputMode="text"
            className="outline-none border-2 border-[--pprl] p-2 rounded"
            autoFocus
            defaultValue={isEditing ? editingQuote?.data?.title : ""}
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
            defaultValue={isEditing ? editingQuote?.data?.message : ""}
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
            {isEditing ? "Confirm" : "Submit"}
          </button>
          {isEditing && (
            <button
              onClick={() => {
                setIsEditing(false);
                setEditingQuote(null);
              }}
              type="button"
              className="px-4 py-2 bg-red-500 font-semibold text-[1.2rem] text-white rounded ml-4"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
      <ul className="max-w-7xl mx-auto mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {quoties?.map((quote, index) => (
          <div className="border-2 border-[--pprl] p-2 rounded" key={index}>
            <div className="flex items-center justify-between">
              <h4 className="text-white font-semibold text-[1.25rem]">
                {quote?.data?.title}
              </h4>
              <div className="flex items-center gap-2">
                <RiDeleteBinFill
                  className="cursor-pointer"
                  onClick={() => handleDelete(quote?.id)}
                  size={25}
                  color="red"
                />
                <FaEdit
                  onClick={() => handleEdit(quote)}
                  className="cursor-pointer"
                  size={25}
                  color="red"
                />
              </div>
            </div>
            <p className="text-white text-[.95rem]">{quote?.data?.message}</p>
          </div>
        ))}
      </ul>
    </section>
  );
}