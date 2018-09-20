import React, { Component } from "react";
import StudentDash from "./SubDashboards/StudentDash";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {};
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
