"use client";

import { isLoggedIn } from "@/services/auth.service";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userLoggedIn = isLoggedIn();
  useEffect(() => {
    if (!userLoggedIn) {
      router.push("/login");
    } else {
      setIsLoading(true);
    }
  }, [router, isLoading]);

  if (!isLoading) {
    return <Loading />;
  }

  return (
   
      <div className="max-w-7xl w-full mx-auto p-8">
        <Header />
        {children}
     
    </div>
  );
};

export default DashboardLayout;
