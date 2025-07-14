import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="bg-background h-screen max-h-screen">
      <div className="container h-full flex flex-col">
        <Header />
          <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
