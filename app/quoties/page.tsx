export default function Quoties() {
  return (
    <section>
      <h1>Quoties Page</h1>

      <form className="max-w-2xl mx-auto p-5 grid gap-5">
        <input type="text" className="p-2 rounded" placeholder="Enter title" />
        <textarea className="p-2 rounded" placeholder="Enter message" rows={5}></textarea>
        <button type="button" className="btn btn-primary-200 border">Submit</button>
      </form>
    </section>
  );
}
