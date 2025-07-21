import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
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
