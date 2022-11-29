import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from "./pages/HomePage/HomePage";
import DetailsPage from "./pages/DetailsPage/DetailsPage";
import store from "./features/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Error Page</div>,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/details/:id",
        element: <DetailsPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
