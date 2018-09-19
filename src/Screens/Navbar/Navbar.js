import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const custom_style = {
    display: "inline",
    margin: "0px 5px",
    backgroundColor: "lightgreen",
    padding: "5px",
    borderRadius: "2px"
  };
  return (
    <ul>
      <li style={custom_style}>
        <Link to="/">Home</Link>
      </li>
      <li style={custom_style}>
        <Link to="/login">Login</Link>
      </li>
      <li style={custom_style}>
        <Link to="/signup">Signup</Link>
      </li>
    </ul>
  );
};
export default Navbar;
