import { useAuth0 } from "@auth0/auth0-react";

export default function SignIn() {
  const { loginWithRedirect } = useAuth0();

  return (
    <section>
      <h1 className="text-center my-10">Sign In</h1>
      <div className="flex justify-center">
        <button type="button" onClick={() => loginWithRedirect()} className="btn btn-accent font-semibold rounded">
          Sign In
        </button>
      </div>
    </section>
  );
}
