import { ModeToggle } from "@/components/ModeToggle";
import { Link } from "react-router-dom";
import CustomAvatar from "./CustomAvatar";
import { Button } from "./ui/button";
import { useGlobalContext } from "@/store/global-state";

const Header = () => {
 const {user} = useGlobalContext()
  return (
    <header className="bg-muted mt-4 px-8 py-3 border border-white/20  rounded-full flex justify-between items-center drop-shadow-foreground/10 drop-shadow-lg">
      <Link to="/">
        <span className="text-lg text-foreground">LOGO</span>
      </Link>
      <div className="flex gap-2">
        <ModeToggle />
        {user ? <CustomAvatar /> : <Button variant={"default"}>Login</Button>}
      </div>
    </header>
  );
};

export default Header;
