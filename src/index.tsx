import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@material-ui/core";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from "./pages/HomePage/HomePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import store from "./features/store";

let theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',
      paper: '#fafafa',
    },
    // primary: {},
    // secondary: {
    //   // This is green.A700 as hex.
    //   main: '#11cb5f',
    // },
  },
});

theme = responsiveFontSizes(theme);

const router = createBrowserRouter([
  {
    path: "/poketest",
    element: <App />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "pokemon/:id",
        element: <DetailsPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
