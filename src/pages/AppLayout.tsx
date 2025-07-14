import { Outlet } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ModeToggle } from "@/components/ModeToggle";

const AppLayout = () => {
  return (
    <main className="bg-background min-h-screen">
      <div className="container">
        <header className="bg-muted mt-4 px-8 py-4  rounded-full flex justify-between items-center drop-shadow-foreground/10 drop-shadow-lg">
          <span className="text-lg text-foreground">LOGO</span>
          <div className="flex gap-2">
            <ModeToggle/>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </header>
      </div>
      <Outlet />
    </main>
  );
};

export default AppLayout;
