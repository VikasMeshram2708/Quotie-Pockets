import { FaSearch } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState } from "react";

const SideBar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bg-slate-600/70 p-2 flex flex-col gap-5">
      <ul className="grid items-center gap-5">
        <li>
          <Link
            to="/"
            className={`${
              pathname === "/" && "border-[--my-purple] border-b-2 pb-3"
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={`${
              pathname === "/about" && "border-[--my-purple] border-b-2 pb-3"
            }`}
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={`${
              pathname === "/contact" && "border-[--my-purple] border-b-2 pb-3"
            }`}
          >
            Contact Us
          </Link>
        </li>
        <li>
          <Link
            to="/privacy-policy"
            className={`${
              pathname === "/privacy-policy" &&
              "border-[--my-purple] border-b-2 pb-3"
            }`}
          >
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link
            to="/terms-of-use"
            className={`${
              pathname === "/terms-of-use" &&
              "border-[--my-purple] border-b-2 pb-3"
            }`}
          >
            Terms of Use
          </Link>
        </li>
      </ul>

      <div className="flex items-center rounded justify-between outline outline-purple-500  gap-2">
        <input
          type="text"
          placeholder="Search"
          className="px-3 rounded-md outline-none bg-transparent sm:text-[1.2rem] p-2"
        />
        <div className="w-14 px-4 py-2 bgPurple">
          <FaSearch size={25} />
        </div>
      </div>
    </section>
  );
};
export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
  }, [pathname]);
  return (
    <nav className="px-5 min-h-[7vh] p-3 shadow shadow-purple-500">
      <div className="flex items-center justify-between">
        <h1 className="textPurple text-[2rem] italic">
          <Link to="/">Quotie Pockets</Link>
        </h1>

        <ul className="lg:flex items-center gap-5 hidden">
          <li>
            <Link
              to="/"
              className={`${
                pathname === "/" && "border-[--my-purple] border-b-2 pb-3"
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`${
                pathname === "/about" && "border-[--my-purple] border-b-2 pb-3"
              }`}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={`${
                pathname === "/contact" &&
                "border-[--my-purple] border-b-2 pb-3"
              }`}
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/privacy-policy"
              className={`${
                pathname === "/privacy-policy" &&
                "border-[--my-purple] border-b-2 pb-3"
              }`}
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              to="/terms-of-use"
              className={`${
                pathname === "/terms-of-use" &&
                "border-[--my-purple] border-b-2 pb-3"
              }`}
            >
              Terms of Use
            </Link>
          </li>
        </ul>

        <div className="hidden lg:flex items-center rounded justify-between outline outline-purple-500  gap-2">
          <input
            type="text"
            placeholder="Search"
            className="px-3 rounded-md outline-none bg-transparent sm:text-[1.2rem] p-2"
          />
          <div className="w-14 px-4 py-3 bgPurple">
            <FaSearch size={25} />
          </div>
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <GiHamburgerMenu
            size={30}
            onClick={() => {
              setToggle((prev) => !prev);
            }}
          />
        </div>
      </div>

      {toggle && (
        <div className="mt-3">
          <SideBar />
        </div>
      )}
    </nav>
  );
}
