
export default function Quoties() {
  const handleForm = async (data: FormData) => {
    "use server"
    console.log("received", data);
  };
  return (
    <section>
      <form action={handleForm} className="mt-10 max-w-2xl mx-auto p-5 grid gap-5">
        <input type="text" className="p-2 rounded" placeholder="Enter title" />
        <textarea
          className="p-2 rounded"
          placeholder="Enter message"
          rows={5}
        ></textarea>
        <button type="button" className="btn btn-primary-200 border">
          Submit
        </button>
      </form>
    </section>
  );
}
