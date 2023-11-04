"use client";

import { isLoggedIn } from "@/services/auth.service";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";

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
  
     
     {children}
   
  );
};

export default DashboardLayout;
