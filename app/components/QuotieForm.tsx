"use client";

import { SubmitQuotie } from "@/lib/SubmitQuotie";
import React, { useRef } from "react";

export default function QuotieForm() {
  const ref = useRef<HTMLFormElement>(null);
  return (
    <>
      <form
        ref={ref}
        action={async (formData) => {
          await SubmitQuotie(formData);
          ref.current?.reset();
        }}
        className="mt-10 max-w-2xl mx-auto p-5 grid gap-5"
      >
        <input
          name="title"
          id="title"
          type="text"
          className="p-2 rounded"
          placeholder="Enter title"
        />
        <textarea
          name="message"
          id="title"
          className="p-2 rounded"
          placeholder="Enter message"
          rows={5}
        ></textarea>
        <button type="submit" className="btn btn-primary-200 border">
          Submit
        </button>
      </form>
    </>
  );
}
