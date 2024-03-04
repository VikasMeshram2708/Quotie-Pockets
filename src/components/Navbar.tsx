import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ImCross } from "react-icons/im";

export default function Navbar() {
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <nav className="border-b-4 border-[--pprl] text-white p-2 flex flex-wrap gap-5 items-center justify-between max-w-[90%] mx-auto">
      <h1 className="text-[2rem] font-Pacifico italic">
        <NavLink to="/">Quotie Pockets</NavLink>
      </h1>
      <ul className="text-center flex flex-wrap gap-5">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="about">About Us</NavLink>
        </li>
        <li>
          <NavLink to="contact">Contact Us</NavLink>
        </li>
        <li>
          <NavLink to="privacy">Privacy Policy</NavLink>
        </li>
        <li>
          <NavLink to="terms">Terms</NavLink>
        </li>
      </ul>
      <div>
        <button
          onClick={() => {
            setToggleModal((prev) => !prev);
          }}
          type="button"
          className="px-4 py-2 rounded-lg border-4 border-[--pprl]  font-semibold text-[1.2rem]"
        >
          Login
        </button>
      </div>
      {toggleModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/40">
          <form className="border-2 grid gap-3 border-[--pprl] rounded max-w-sm p-5">
            <div className="flex justify-end">
              <ImCross
                className="cursor-pointer"
                size={25}
                color="red"
                onClick={() => {
                  setToggleModal(false);
                }}
              />
            </div>
            <h1 className="text-center text-[2rem]">Login</h1>
            <div className="grid gap-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                inputMode="email"
                className="border-4 rounded border-[--pprl] outline-none text-black p-2"
                placeholder="Enter email"
              />
            </div>
            <div className="grid gap-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="border-4 rounded border-[--pprl] outline-none text-black p-2"
                placeholder="Enter password"
              />
            </div>
            <div className="grid place-content-center">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border-4 border-[--pprl]  font-semibold text-[1.2rem]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </nav>
  );
}
