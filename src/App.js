
import React from "react";
import "./App.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useRoutes,
} from "react-router-dom";

function App() {
  let routes = useRoutes([
    { path:"/", element: <Login /> },
    { path:"/register", element: <Register /> },
    { path: "/home", element: <Home /> }
  ]);
  return routes
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;