import React, { Component } from "react";
class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
  }

  studentDashboard() {}

  render() {
    const authAs = localStorage.getItem("authAs");
    return (
      <div>
        <li>dash</li>
        <li>board</li>
      </div>
    );
  }
}
