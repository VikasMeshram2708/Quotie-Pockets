export default function Quotie() {
  return (
    <section className="max-w-2xl mx-auto mt-24">
      <form className="grid gap-5">
        <div className="grid gap-3 text-white">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            inputMode="text"
            className="outline-none border-2 border-[--pprl] p-2 rounded"
            autoFocus
            placeholder="Enter text"
          />
        </div>
        <div className="grid text-white gap-3">
          <label htmlFor="message">Message</label>
          <textarea
            inputMode="text"
            placeholder="Enter message"
            className="outline-none border-2 border-[--pprl] p-2 rounded"
            autoFocus
            rows={5}
          ></textarea>
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
