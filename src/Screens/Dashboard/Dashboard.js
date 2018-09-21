import React, { Component } from "react";
import fire from "../../config/fire";
import StudentDash from "./SubDashboards/StudentDash";

class Dashboard extends Component {
  constructor() {
    super();
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
    const authAs = localStorage.getItem("authAs");
    return (
      <div>
        <div className="container-fluid">
          <StudentDash />
          {/* <div className="row">
            <div className="col-md-3">
              
            </div>
            <div className="col-md-9">dashboard</div>
          </div> */}
        </div>
      </div>
    );
  }
}
export default Dashboard;
