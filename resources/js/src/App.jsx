import React from "react";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

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
]);

const theme = createTheme({
  palette: {
    primary: {
      main: '#da1a2c'
    }
  }
});

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;