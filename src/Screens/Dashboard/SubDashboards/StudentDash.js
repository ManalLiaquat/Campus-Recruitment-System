import React, { Component } from "react";
class StudentDash extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const authAs = localStorage.getItem("authAs");
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <ul className="navbar-nav">
                <li className="nav-link">
                  <button className="btn btn-primary btn-lg">My Info</button>
                </li>
                <li className="nav-link">
                  <button className="btn btn-success btn-lg">
                    My Applications
                  </button>
                </li>
                <li className="nav-link">
                  <button className="btn btn-danger btn-lg">Find a Job</button>
                </li>
              </ul>
            </div>
            <div className="col-md-9">
              <h1>Dashboard</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default StudentDash;
