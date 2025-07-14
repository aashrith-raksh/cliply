import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="bg-background min-h-screen">
      <div className="container">
        <Header />
        <section className="my-4">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default AppLayout;
