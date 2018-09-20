import React, { Component } from "react";
import { Link } from "react-router-dom";
import Logout from "../Logout/Logout";
import fire from "../../config/fire";
import logo from "../../logo.svg";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
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
    const custom_style = {
      display: "inline",
      margin: "0px 5px",
      backgroundColor: "lightgreen",
      padding: "5px",
      borderRadius: "2px"
    };
    const { user } = this.state;
    return (
      <nav className="navbar navbar-expand-lg navbar-light navBG">
        <a class="navbar-brand" href="#">
          <img src={logo} width="30" height="30" alt="logo" />
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
              <a className="nav-link" href="#">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Pricing
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown link
              </a>
              <div
                className="dropdown-menu bg-dark"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
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
