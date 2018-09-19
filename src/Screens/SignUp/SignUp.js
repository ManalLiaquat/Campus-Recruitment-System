import React, { Component } from "react";
import fire from "../../config/fire";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    const { name, email, password } = this.state;
    let authAs = localStorage.getItem("authAs");
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data);
        const { uid } = fire.auth().currentUser;
        let studentObj = { name, email, uid, password };
        fire
          .database()
          .ref(`/${authAs}_data`)
          .child(data.user.uid)
          .set(studentObj);
        fire.auth().currentUser.updateProfile({
          displayName: name
        });
        alert("Successfully Signup");
      })
      .catch(e => {
        alert("Error while Signup\n" + e);
      });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="name"
          autoFocus={true}
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
        />
        <input
          type="email"
          autoComplete="true"
          placeholder="email"
          onChange={e => {
            this.setState({ email: e.target.value });
          }}
        />
        <input
          type="password"
          autoComplete="true"
          placeholder="password"
          onChange={e => {
            this.setState({ password: e.target.value });
          }}
        />
        <button type="submit" onClick={this.signUp}>
          Sign Up
        </button>
      </div>
    );
  }
}
export default SignUp;
