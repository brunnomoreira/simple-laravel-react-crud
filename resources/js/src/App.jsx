import React from "react";

import { RouterProvider } from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

import { ToastContainer } from "react-toastify";

import { ReactQueryDevtools } from "react-query/devtools";

import IndexContext from "./contexts/IndexContext";

import 'react-toastify/dist/ReactToastify.css';

import LoadingContainer from "./components/LoadingContainer";

import router from "./services/router";
import theme from "./services/theme";


const queryClient = new QueryClient();

const App = () => {
  return (
    // <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <IndexContext>
          <ThemeProvider theme={theme}>
            <LoadingContainer>
              <RouterProvider router={router} />
            </LoadingContainer>
            <ToastContainer />
          </ThemeProvider>
        </IndexContext>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    // </React.StrictMode>
  );
}

export default App;