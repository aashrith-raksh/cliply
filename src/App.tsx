import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import RedirectLink from "./pages/RedirectLink";
import Home from "./pages/Home";
import Link from "./pages/Link";
import { ThemeProvider } from "./Providers/ThemeProvider";
import { LoginForm } from "./components/auth/LoginForm";
import AuthLayout from "./pages/AuthLayout";
import Dashboard from "./pages/Dashboard";
import GlobalProvier from "./Providers/GlobalProvier";
import Register from "./components/auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "link/:id", element: <Link /> },
      { path: ":id", element: <RedirectLink /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LoginForm /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <GlobalProvier>
        <RouterProvider router={router} />
      </GlobalProvier>
    </ThemeProvider>
  );
}

export default App;
