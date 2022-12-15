import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VacanciesList from "./pages/Admin/Vacancies/List";
import VacanciesNew from "./pages/Admin/Vacancies/New";
import AuthContextProvider from "./contexts/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    children: [
      {
        path: "vacancies",
        element: <VacanciesList />,
      },
      {
        path: "vacancies/new",
        element: <VacanciesNew />,
      },
    ],
  },
]);

const theme = createTheme({
  palette: {
    primary: {
      main: '#da1a2c'
    },
    secondary: {
      main: '#da1a2c'
    }
  }
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <ThemeProvider theme={theme}>
            <RouterProvider router={router} />
          </ThemeProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;