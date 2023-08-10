import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
import {ProtectedRouteNormalUser} from './ProtectedRouteNormalUser'
import HomePage from "../Pages/HomePage";
import UserRegister from "../Pages/User/UserRegister";
import UserProfile from "../Pages/User/UserProfile";
import UserLogin from "../Pages/User/UserLogin";
import Parent from "../Parent";
import NotFound from "../Componentes/layouts/NotFound";
import {useContext} from 'react'
import { AuthContext } from "../Context/AuthContext";

const Routes = () =>{
  
  const {adm} = useContext(AuthContext)

    const routesForPublic =[
        {
            path: '/',
            element: <Parent/>,
            children:[
                {
                    path: '/',
                    element: <HomePage/>
                },
                {
                    path: '/login',
                    element: <UserLogin/>
                },
                {
                  path: '/register',
                  element: <UserRegister/>
                }
            ]
        }
    ];

    const routesForAuthenticateOnly =[
        {
            path: '/',
            element: <ProtectedRoute/>,
            children: [
                {
                    path: '/',
                    element: <HomePage/>
                  },
                  {
                    path: '/register',
                    element: <UserRegister/>
                  },
                  {
                    path: '/profile',
                    element: <UserProfile/>
                  }
            ]
        }
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: '/',
            element: <ProtectedRouteNormalUser/>,
            children:[
                {
                    path: "/",
                    element: <HomePage/>,
                  },
                  {
                    path: '/profile',
                    element: <UserProfile/>
                  },
                  {
                    path: '/register',
                    element:<NotFound/>
                  }
                  
            ]
        }
      ];

      
      
      const router = createBrowserRouter([
        ...routesForPublic,
        ...(adm == '0'? routesForNotAuthenticatedOnly : routesForAuthenticateOnly)
      ]);
      

      return <RouterProvider router={router}/>
}

export default Routes;