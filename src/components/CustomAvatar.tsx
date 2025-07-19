import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { useGlobalContext } from "@/store/global-state";
import supabase from "@/db/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const CustomAvatar = () => {

  const {user} = useGlobalContext();
  const navigate = useNavigate()

  async function handleLogout() {
    const {error} = await supabase.auth.signOut()
    if(error) toast(error.message)
    navigate("/", {replace:true});
    window.location.reload();
    
  }

  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={user?.user_metadata.profile_pic} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>My Links</DropdownMenuItem>
        <DropdownMenuItem className="mt-4">
          <Button variant="link" className="w-full text-red-600 !justify-start !px-0" onClick={handleLogout}>
            <LogOutIcon className="text-inherit" />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomAvatar;
