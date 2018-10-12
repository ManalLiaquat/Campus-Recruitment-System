import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import fire from "../../config/fire";
import logo from "../../logo.svg";
import './Navbar.css'

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  authAs(authAs) {
    console.log(authAs);
    if (authAs) {
      localStorage.setItem("authAs", authAs);
    }
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        console.log(user.displayName + " is logged in");
      } else {
        this.setState({ user: false });
        console.log("user Not signed in");
      }
    });
  }

  render() {
    const { user } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light navBG">
        <a className="navbar-brand">
          <img
            src={logo}
            className="My-app-logo"
            width="30"
            height="30"
            alt="logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Contact</a>
            </li>
            {user ? (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="profileDropdownList"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Profile
                </a>
                <div
                  className="dropdown-menu bg-dark"
                  aria-labelledby="profileDropdownList"
                >
                  <Link className="dropdown-item" to="/dashboard">
                    Dashboard
                  </Link>
                  <a className="dropdown-item">
                    <Logout />
                  </a>
                </div>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Login/Signup As
                </a>
                <div
                  className="dropdown-menu bg-dark"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => {
                      this.authAs("student");
                    }}
                  >
                    Student
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => {
                      this.authAs("company");
                    }}
                  >
                    Company
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/login"
                    onClick={() => {
                      this.authAs("admin");
                    }}
                  >
                    Admin
                  </Link>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>

      // <ul>
      //   <li style={custom_style}>
      //     <Link to="/">Home</Link>
      //   </li>
      //   {user ? (
      //     <li style={custom_style}>
      //       <Logout />
      //     </li>
      //   ) : (
      //     <span>
      //       <li style={custom_style}>
      //         <Link to="/login">Login</Link>
      //       </li>
      //       <li style={custom_style}>
      //         <Link to="/signup">Signup</Link>
      //       </li>
      //     </span>
      //   )}
      // </ul>
    );
  }
}
export default Navbar;
