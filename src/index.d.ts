import type { AuthUser } from "@supabase/supabase-js"
import type { Dispatch, SetStateAction } from "react"

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type GlobalStateType = {
  user: AuthUser | null
  setUser: Dispatch<SetStateAction<AuthUser | null>>;
}

type signUpType = {
  email: string;
  password: string;
  name: string;
  file: File;
};
