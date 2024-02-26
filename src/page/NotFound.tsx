import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h1 className="text-center sm:text-3xl">NotFound</h1>
      <Link to="/">Home</Link>
      {/* <button type="button">Goto Home</button> */}
    </section>
  );
}
