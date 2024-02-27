import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1 className="text-center sm:text-3xl">NotFound</h1>
      <div className="mt-10 flex justify-center">
        <button type="button" className="btn btn-secondary rounded">
          <Link to="/">Goto Home</Link>
        </button>
      </div>
      {/* <button type="button">Goto Home</button> */}
    </section>
  );
}
