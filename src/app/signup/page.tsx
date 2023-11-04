import SignupPage from "@/components/SignUp/SignUp";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task Management  | SignUp",
};


const SignUp = () => {
  return (
    <div>
      <SignupPage />
    </div>
  );
};

export default SignUp;