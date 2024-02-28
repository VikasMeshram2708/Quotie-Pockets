import { useAuth0 } from "@auth0/auth0-react";
import { SyntheticEvent } from "react";

export default function Dashboard() {
  const { user, logout } = useAuth0();

  return (
    <section className="max-w-[90%] mx-auto mt-24">
      <div className="flex justify-center">
        <div className="flex items-center flex-col">
          <img
            src={user?.picture}
            alt={user?.given_name}
            className="w-44 h-44 rounded-full b"
            onError={(e: SyntheticEvent<HTMLImageElement>) =>
              (e.currentTarget.src = "https://is.gd/DwwpQT")
            }
          />
          <div className="mt-10">
            <h1 className="text-3xl font-semibold text-center">
              {user?.given_name}
            </h1>
            <p>{user?.email}</p>
          </div>
          <button
            onClick={() => logout()}
            type="button"
            className="mt-10 btn btn-error text-white text-lg font-semibold rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
}
