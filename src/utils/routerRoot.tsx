import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Example } from 'components/Layout';
import Layout from 'components/Common/Layout';
import { NotFound } from 'components/Common';
import HomePage from 'features/Home/page/HomePage';
import PublicRoutes from 'components/Common/PublicRoute';


const routerRoot = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />,
    index: true
  },
  {
    path:'/test',
    element: <PublicRoutes />,
    children: [
    ]
  },
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            path: 'example',
            element: <Example />,
          },
          {
            path: 'home',
            element: <HomePage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default routerRoot;
