import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { useGlobalContext } from "@/store/global-state";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AppLayout = () => {
  const { user } = useGlobalContext();
  const location = useLocation();
  const isRoot = location.pathname === "/";

  if (!user && !isRoot) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
  return (
    <main className="bg-background h-screen max-h-screen">
      <div className="container h-full flex flex-col">
        <Toaster />
        <Header />
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
