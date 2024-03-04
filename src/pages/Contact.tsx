export default function Contact() {
  return (
    <section className="max-w-xl mx-auto">
      <h1 className="text-white text-4xl text-center mt-10">Contact Us</h1>

      <form className="grid gap-5 p-8 rounded-lg text-white shadow-lg">
        <div className="grid gap-3">
          <label htmlFor="name" className="text-lg">Name</label>
          <input type="text" className="outline-none border-4 border-[--pprl] p-3 rounded" placeholder="Enter name" />
        </div>
        <div className="grid gap-3">
          <label htmlFor="email" className="text-lg">Email</label>
          <input type="email" className="outline-none border-4 border-[--pprl] p-3 rounded" placeholder="Enter email" />
        </div>
        <div className="grid gap-3">
          <label htmlFor="message" className="text-lg">Message</label>
          <textarea className="outline-none border-4 border-[--pprl] p-3 rounded" rows={5} placeholder="Enter message"></textarea>
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
