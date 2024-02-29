import { Link, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { SyntheticEvent, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaChevronDown } from "react-icons/fa";

const SideBar = () => {
  const { pathname } = useLocation();
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const [toggleProfile, setToggleProfile] = useState(false);

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
      <div className="flex items-center">
        {isAuthenticated && (
          <div className="w-44 relative flex items-center gap-3">
            <img
              className="w-14 p-2 h-14"
              src={user?.picture}
              onError={(e: SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = "https://is.gd/DwwpQT";
              }}
              alt="signed in users"
            />
            <div className="flex items-center gap-2">
              <p className="text-[1.5rem] font-semibold">{user?.given_name}</p>
              <FaChevronDown
                onClick={() => setToggleProfile((prev) => !prev)}
                size={25}
              />
            </div>
            {toggleProfile && (
              <div className="absolute left-0 p-5 w-full top-14 border-2 border-[--my-purple] bg-black rounded-xl">
                <div className="grid gap-2">
                  <p className="text-[1.2rem] font-semibold hover:underline cursor-pointer">
                    Dashboard
                  </p>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="btn btn-error text-lg text-white
                     rounded-full"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {!isAuthenticated && (
          <button
            onClick={() => loginWithRedirect()}
            className="px-4 py-2 border-2 border-[--my-purple] rounded text-[1.2rem] hover:bg-purple-600 font-semibold"
          >
            Login
          </button>
        )}
      </div>
    </section>
  );
};
export default function Navbar() {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const [toggleProfile, setToggleProfile] = useState(false);

  const [toggle, setToggle] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // console.log("status", isAuthenticated);
    // console.log("loading", isLoading);
  }, [pathname, isAuthenticated, user]);

  return (
    <nav className="px-5 min-h-[7vh] max-w-[90%] mx-auto p-3 border-b-2 border-[--my-purple]">
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
          {user?.given_name && (
            <li>
              <Link
                to="/dashboard"
                className={`${
                  pathname === "/dashboard" &&
                  "border-[--my-purple] border-b-2 pb-3"
                }`}
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden border-2 lg:flex items-center rounded border-[--my-purple]">
          {isAuthenticated && (
            <div className="w-44 relative flex items-center gap-3">
              <img
                className="w-14 p-2 h-14"
                src={user?.picture}
                onError={(e: SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.src = "https://is.gd/DwwpQT";
                }}
                alt="signed in users"
              />
              <div className="flex items-center gap-2">
                <p className="text-[1.5rem] font-semibold">
                  {user?.given_name}
                </p>
                <FaChevronDown
                  onClick={() => setToggleProfile((prev) => !prev)}
                  size={25}
                />
              </div>
              {toggleProfile && (
                <div className="absolute left-0 p-5 w-full top-14 border-2 border-[--my-purple] bg-black rounded-xl">
                  <div className="grid gap-2">
                    <p className="text-[1.2rem] font-semibold hover:underline cursor-pointer">
                      Dashboard
                    </p>
                    <button
                      onClick={() => logout()}
                      type="button"
                      className="btn btn-error text-lg text-white
                     rounded-full"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {!isAuthenticated && (
            <button
              onClick={() => loginWithRedirect()}
              className="px-4 py-2 border-2 border-[--my-purple] rounded text-[1.2rem] hover:bg-purple-600 font-semibold"
            >
              Login
            </button>
          )}
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
