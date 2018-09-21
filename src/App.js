import React, { Component } from "react";
// import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import fire from "./config/fire";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
      </div>
    );
  }
}

export default App;
