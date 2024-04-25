import React, { useEffect } from "react";
import Login from "./pages/Login";
import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Register from "./pages/Register";
import ToastContainers from "./toastify/ToastContainers";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import TopNav from "./components/Navbar/TopNav";
import { useUserContext } from "./hook/UserContextApi";
import { useSelector } from "react-redux";

const App = () => {
  const getDirInfo = JSON.parse(sessionStorage.getItem("userinfo"));
  const userInfo = useSelector((state) => state.auth.userInfo);

  const AuthGuard = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (getDirInfo !== null) {
        <Navigate to={"/"} replace />;
        navigate("/");
      }
    }, []);
    return children;
  };

  const Layout = () => {
    return getDirInfo ? (
      <section id="container">
        <Navbar />
        <div className="c__nav-outlet">
          <TopNav />
          <Outlet />
        </div>
      </section>
    ) : (
      <Navigate to={"/login"} replace />
    );
  };

  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <AuthGuard>
          <Login />
        </AuthGuard>
      ),
    },
    {
      path: "/register",
      element: (
        <AuthGuard>
          <Register />
        </AuthGuard>
      ),
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainers />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
