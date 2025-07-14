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