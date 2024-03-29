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
import ServoRegister from "../Pages/Servos/ServoRegister";
import ServoHome from "../Pages/Servos/ServoHome";
import SeriesRegister from "../Pages/Series/SeriesRegister";
import SearchPage from "../Pages/SearchPage";
import ServoProfile from "../Pages/Servos/ServoProfile";
import SeriesHome from "../Pages/Series/SeriesHome";
import SeriesProfile from "../Pages/Series/SeriesProfile";

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
                  },
                  {
                    path: '/servo-register',
                    element: <ServoRegister/>
                  },
                  {
                    path: '/servos',
                    element: <ServoHome/>
                  },
                  {
                    path: '/series-register',
                    element: <SeriesRegister/>
                  },
                  {
                    path: '/search',
                    element: <SearchPage/>
                  },
                  {
                    path: '/servo-profile/:name',
                    element: <ServoProfile/>
                  },
                  {
                    path: '/series',
                    element: <SeriesHome/>
                  },
                  {
                    path: '/series-profile/:nome',
                    element: <SeriesProfile/>
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
                  },
                  {
                    path: '/search',
                    element: <SearchPage/>
                  },
                  {
                    path: '/servo-profile/:name',
                    element: <ServoProfile/>
                  },
                  {
                    path: '/series',
                    element: <SeriesHome/>
                  },
                  {
                    path: '/series-profile/:nome',
                    element: <SeriesProfile/>
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