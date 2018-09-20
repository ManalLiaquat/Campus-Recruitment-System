import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import fire from "./config/fire";
// import Login from "./Screens/Login/Login";
// import SignUp from "./Screens/SignUp/SignUp";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
        console.log(user.displayName + " is logged in");
      } else {
        console.log("user Not signed in");
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div>
          <h4>SignUp/Login as:</h4>
          <button
            onClick={() => {
              this.authAs("student");
            }}
          >
            <Link to="/login">Student</Link>
          </button>
          <button
            onClick={() => {
              this.authAs("company");
            }}
          >
            <Link to="/login">Company</Link>
          </button>
          <button
            onClick={() => {
              this.authAs("admin");
            }}
          >
            <Link to="/login">Admin</Link>
          </button>
        </div>
        {/* <Login /> */}
        {/* <SignUp /> */}
      </div>
    );
  }
}

export default App;
