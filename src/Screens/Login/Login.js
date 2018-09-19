import React, { Component } from "react";
import fire from "../../config/fire";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userEmail: "",
      userPassword: "",
      authAs: localStorage.getItem("authAs")
    };
    this.logIn = this.logIn.bind(this);
  }

  logIn() {
    const { userEmail, userPassword } = this.state;
    fire
      .auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        alert("Successfully Login");
      })
      .catch(e => {
        alert("Error while loging in" + e);
      });
  }

  render() {
    return (
      <div>
        <input
          type="email"
          autoFocus={true}
          placeholder="email"
          onChange={e => {
            this.setState({ userEmail: e.target.value });
          }}
        />
        <input
          type="password"
          placeholder="password"
          onChange={e => {
            this.setState({ userPassword: e.target.value });
          }}
        />
        <button type="submit" onClick={this.logIn}>
          Log In
        </button>
      </div>
    );
  }
}
export default Login;
