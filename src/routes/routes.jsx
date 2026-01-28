import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Error from '../components/Error/Error';
import Cities from '../components/SideBar_Outlets/Cities';
import Loading from '../components/LoadingText';
import HomePage from '../UI/HomePage';
import Signup from '../UI/Signup';
import Pricing from '../UI/Pricing';
import NotFound from '../UI/NotFound';
import Login from '../UI/Login';
import Product from '../UI/Product';
import AppLayout from '../UI/AppLayout';
import Countries from '../components/SideBar_Outlets/Countries';
import CityInfo from '../components/SideBar_Outlets/CityInfo';
import { authUser } from '../utils/authUser';
import ProtectedRoute from '../components/ProtectedRoute';
// import ForbiddenPage from '../components/ForbiddenPage';
import NewCityForm from '../components/SideBar_Outlets/NewCityForm';
import { fetchCityInfo } from '../utils/citiesUtils/newCityInfoFetch';
import LoadingSpinner from '../components/LoadingSpiinerSmall';
import ErrorAmbulance from '../components/Error/ErrorAmbulance';
import AboutPage from '../UI/AboutPage';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <Error />,
    hydrateFallbackElement: <Loading />,
    children: [
      {
        path: '/',
        element: <HomePage />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: '/pricing',
        element: <Pricing />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: '/product',
        element: <Product />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: '/login',
        element: <Login />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: '/signup',
        element: <Signup />,
        hydrateFallbackElement: <Loading />,
      },
      {
        path: '/about',
        element: <AboutPage />,
        hydrateFallbackElement: <Loading />,
      },
      {
        element: <ProtectedRoute />,
        loader: authUser,
        hydrateFallbackElement: <Loading />,
        errorElement: <ErrorAmbulance />,
        children: [
          {
            path: '/app',
            element: <AppLayout />,
            hydrateFallbackElement: <Loading />,
            children: [
              {
                index: true,
                element: <Navigate to="cities" replace />,
              },
              {
                path: 'cities',
                element: <Cities />,
              },
              {
                path: 'cities/:id',
                element: <CityInfo />,
              },
              {
                path: 'countries',
                element: <Countries />,
              },
              {
                path: 'form',
                element: <NewCityForm />,
                loader: fetchCityInfo,
                hydrateFallbackElement: <LoadingSpinner />,
              },
            ],
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
        hydrateFallbackElement: <Loading />,
      },
    ],
  },
]);

export default router;
