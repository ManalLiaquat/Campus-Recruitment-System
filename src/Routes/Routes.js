import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "../Screens/Navbar/Navbar";
import App from "../App";
import Login from "../Screens/Login/Login";
import SignUp from "../Screens/SignUp/SignUp";
import Dashboard from "../Screens/Dashboard/Dashboard";

const CustomRoutes = () => (
  <Router>
    <div>
      <Navbar />

      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </Router>
);

export default CustomRoutes;
