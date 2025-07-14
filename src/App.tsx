import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import Auth from "./pages/Auth";
import RedirectLink from "./pages/RedirectLink";
import Home from "./pages/Home";
import Link from "./pages/Link";
import { ThemeProvider } from "./Providers/ThemeProvider";


const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index:true, element: <Home /> },
      { path: 'auth', element: <Auth /> },
      { path: 'link/:id', element: <Link /> },
      { path: ':id', element: <RedirectLink /> },
    ],
  },
]);


function App() {
  return <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
    </ThemeProvider>
   
}

export default App;