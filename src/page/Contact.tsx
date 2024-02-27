import { ChangeEvent, FormEvent, useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = {
        name,
        email,
        message,
      };
      console.log("data", data);
    } catch (error) {
      console.log(
        error instanceof Error
          ? error?.message
          : "Something went wrong try again."
      );
    }
  };
  return (
    <section className="max-w-2xl mx-auto mt-24">
      <h1 className="text-5xl text-center mb-10">Contact Us</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-5">
        <div className="grid grid-cols-2 gap-3">
          <input
            className="outline-none p-3 rounded"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <input
            className="outline-none p-3 rounded"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
          />
        </div>
        <div className="">
          <textarea
            rows={5}
            className="w-full p-2 outline-none rounded"
            placeholder="Message"
            value={message}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(event.target.value)
            }
          ></textarea>
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
