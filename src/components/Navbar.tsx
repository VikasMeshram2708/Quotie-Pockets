import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { ImCross } from "react-icons/im";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchemaType } from "../context/UserContext";
import * as z from "zod";
import { UserUserContext } from "../context/UserState";
import { RiEyeCloseFill } from "react-icons/ri";
import { BsFillEyeFill } from "react-icons/bs";
import { destroyCookie } from "nookies";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, {
      message: "Message must be at least 5 characters long",
    })
    .max(100, {
      message: "Message must be at most 500 characters long",
    }),
});
export default function Navbar() {
  const [toggleEye, setToggleEye] = useState(false);

  const { storeLoginDetails, isAuthenticated } = UserUserContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginSchemaType>();

  const handleLoginForm: SubmitHandler<LoginSchemaType> = async (data) => {
    LoginSchema.parse(data);
    storeLoginDetails(data);
    reset();
    await new Promise(() => {
      setToggleModal(false);
    });
  };
  const [toggleModal, setToggleModal] = useState(false);

  useEffect(() => {}, [isAuthenticated]);

  return (
    <nav className="border-b-4 border-[--pprl] text-white h-24 p-2 flex flex-wrap gap-5 items-center justify-between max-w-[90%] mx-auto">
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
        {isAuthenticated ? (
          <button
            onClick={async () => {
              destroyCookie(null, "quotieAuth");
              alert("Logged Out Successfully.");
              return window.location.reload();
            }}
            type="button"
            className="px-4 py-2 rounded-lg border-4 border-[--pprl]  font-semibold text-[1.2rem]"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              setToggleModal((prev) => !prev);
            }}
            type="button"
            className="px-4 py-2 rounded-lg border-4 border-[--pprl]  font-semibold text-[1.2rem]"
          >
            Login
          </button>
        )}
      </div>
      {toggleModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500/40">
          <form
            onSubmit={handleSubmit(handleLoginForm)}
            className="border-2 grid gap-3 border-[--pprl] text-white rounded max-w-sm p-5"
          >
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
                className="border-4 rounded border-[--pprl] outline-none p-2"
                placeholder="Enter email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
              />
              {errors?.email && (
                <p className="text-red-500 font-semibold">
                  {errors?.email?.message}
                </p>
              )}
            </div>
            <div className="grid gap-3 relative">
              <label htmlFor="password">Password</label>
              <input
                type={toggleEye ? "text" : "password"}
                className="border-4 rounded border-[--pprl] outline-none p-2"
                placeholder="Enter password"
                {...register("password", {
                  min: {
                    value: 5,
                    message: "Password must be at least 5 characters long",
                  },
                  max: {
                    value: 100,
                    message: "Password must be at most 100 characters long",
                  },
                })}
              />
              {toggleEye ? (
                <BsFillEyeFill
                  onClick={() => {
                    setToggleEye((prev) => !prev);
                  }}
                  className="absolute right-3 bottom-4 cursor-pointer"
                />
              ) : (
                <RiEyeCloseFill
                  onClick={() => {
                    console.log("toggled", toggleEye);
                    setToggleEye((prev) => !prev);
                  }}
                  className="absolute right-3 bottom-4 cursor-pointer"
                />
              )}
              {errors?.password && (
                <p className="text-red-500 font-semibold">
                  {errors?.password?.message}
                </p>
              )}
            </div>
            <div className="grid place-content-center">
              <button
                type="submit"
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
