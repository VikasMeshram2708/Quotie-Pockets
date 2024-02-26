import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="px-5 min-h-[10vh] shadow shadow-purple-500 flex items-center justify-between">
      <h1 className="textPurple sm:text-[2rem] italic">
        <Link to="/">Quotie Pockets</Link>
      </h1>
      <ul className="flex items-center gap-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
        <li>
          <Link to="/contact">Contact Us</Link>
        </li>
        <li>
          <Link to="/privacy-policy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/terms-of-use">Terms of Use</Link>
        </li>
      </ul>
      <div className="flex items-center rounded outline outline-purple-500   gap-2">
        <input
          type="text"
          placeholder="Search"
          className="px-3 rounded-md outline-none bg-transparent sm:text-[1.2rem] p-2"
        />
        <div className="w-14 p-2">
          <FaSearch size={25} />
        </div>
      </div>
    </nav>
  );
}
