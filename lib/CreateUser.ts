export const handleSignUp = async (data: FormData) => {
  "use server";

  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");

  console.log("sign-up-data", { name, email, password });
};
