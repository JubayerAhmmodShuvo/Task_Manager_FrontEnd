"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler } from "react-hook-form";

import loginImage from "../../assets/login-image.png";
import { useUserLoginMutation } from "../../redux/api/authApi";

import { loginSchema } from "../../schemas/login";
import { storeUserInfo } from "@/services/auth.service";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../FORMS/FormInput";
import Form from "../FORMS/Form";




type FormValues = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const [userLogin] = useUserLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userLogin({ ...data }).unwrap();

      if (res?.accessToken) {
        router.push("/home");
        toast.success("User logged in successfully!");
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center max-w-screen min-h-screen bg-gray-100">
      <div className="md:w-1/2 lg:w-1/3">
        <Image src={loginImage} width={350} alt="login image" />
      </div>
      <div className="md:w-1/2 lg:w-2/3 p-8">
        <h1 className="text-2xl text-center text-blue-500 font-bold mb-4">
          First Login In Your Account
        </h1>
        <div className="mb-4">
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div className="mb-4">
              <FormInput
                name="email"
                type="text"
                size="large"
                label="User Email"
                required
                disabled={false} // Set disabled to true or false as needed
                className="w-full py-2 px-3 bg-gray-100 text-lg rounded-md" // Add className here
              />
            </div>
            <div className="mb-4 w-full">
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
                required
                disabled={false} 
                className="w-full py-2 px-3 bg-gray-100 text-lg rounded-md" 
              />
            </div>
            <button
              className="w-full py-3 px-4 bg-blue-500 text-white rounded-md font-semibold"
              type="submit"
            >
              Login
            </button>
          </Form>
        </div>
        <p style={{ textAlign: "center", fontSize: "20px" }}>
          Don&rsquo;t have an account? Please
          <Link href="/signup">
          
            <p className="text-blue-500">SignUp</p>
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
