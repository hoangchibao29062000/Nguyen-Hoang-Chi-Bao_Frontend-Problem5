import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const isLoggedIn = Boolean(localStorage.getItem("access_token"));
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <Outlet />; // Quan trọng! Render các route con nếu đã đăng nhập
}