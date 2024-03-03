import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="max-w-[90%] mx-auto border-b-2 border-[--my-purple] flex items-center justify-between h-20 min-h-20">
      <h1 className="text-[--my-purple] font-Pacifico tracking-wider text-[2rem] italic">
        <Link to="/">Quotie Pockets!</Link>
      </h1>
      <ul className="text-white flex gap-5 items-center">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/privacy">Privacy</Link>
        </li>
        <li>
          <Link to="/terms">Terms of Use</Link>
        </li>
      </ul>
      <div>
        <button
          type="button"
          className="px-4 py-2 rounded text-white text-[1.2rem] font-semibold border-2 border-[--my-purple]"
        >
          Login
        </button>
      </div>
    </nav>
  );
}
