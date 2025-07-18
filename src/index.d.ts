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

type URL_Type = {
    created_at: string;
    custom_url: string | null;
    id: number;
    original_url: string | null;
    qr: string | null;
    short_url: string | null;
    user_id: string | null;
}

type DashboardStateType = {
  urls: URL_Type[] | null;
  totalClicks:number | null;
  totalLinksCreated: number | null;
  fetchAllUrls: () => void;
}

type signUpType = {
  email: string;
  password: string;
  name: string;
  file: File;
};

interface UploadUrlData {
  longUrl: string;
  customUrl?: string; 
  title: string;
  userId: string;
}

