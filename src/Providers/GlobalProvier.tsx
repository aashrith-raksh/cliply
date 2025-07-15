import supabase from "@/db/supabase";
import { globalContext } from "@/store/global-state";
import type { AuthUser } from "@supabase/supabase-js";
import { useState, type ReactNode } from "react";
const {
  data: { user },
} = await supabase.auth.getUser();
const initialUser = user;
const GlobalProvier = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(initialUser);

  const value = {
    user,
    setUser,
  };
  return (
    <globalContext.Provider value={value}>{children}</globalContext.Provider>
  );
};

export default GlobalProvier;
