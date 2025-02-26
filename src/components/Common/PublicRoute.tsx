// import { Navigate } from 'react-router-dom';
// import LoginPage from 'features/auth/pages/LoginPage';
// import ForgotPassword from 'features/auth/pages/ForgotPasswordPage';

// export default function publicRoute() {
//   return [
//     { path: '/login', element: <LoginPage /> },
//     { path: '/forgot-password', element: <ForgotPassword /> },
//     { path: '*', element: <Navigate to="/login" replace /> },
//   ];
// }

import { Navigate, Outlet, RouteProps } from 'react-router-dom';

export default function PublicRoutes(props: RouteProps) {
  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (isLoggedIn) return <Navigate to="/" replace/>;

  return <Outlet />;
}