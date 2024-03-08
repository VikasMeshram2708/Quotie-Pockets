import CustomCookieProvider from "../components/CustomCookieProvider";
import SigninForm from "../components/SigninForm";

export default function Signin() {
  return (
    <section>
      <CustomCookieProvider>
        {/* Form section */}
        <SigninForm />
      </CustomCookieProvider>
    </section>
  );
}
