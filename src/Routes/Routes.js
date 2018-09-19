import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from "../Screens/Navbar/Navbar";
import App from "../App";
import Login from "../Screens/Login/Login";
import SignUp from "../Screens/SignUp/SignUp";

const CustomeRoutes = () => (
  <Router>
    <div>
      <Navbar />

      <Route exact path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </div>
  </Router>
);

export default CustomeRoutes;
