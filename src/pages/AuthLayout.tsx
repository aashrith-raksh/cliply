import { Toaster } from "@/components/ui/sonner";
import { useGlobalContext } from "@/store/global-state";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();

  console.log("auth rendered")

  const { user } = useGlobalContext();

  useEffect(() => {
    if (user) {
      navigate("/dashboard"); 
    }
  },[]);

  if(user) return null;
  return (
    <main className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Toaster />
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
