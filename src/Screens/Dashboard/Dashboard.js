import React, { Component } from "react";
import fire from "../../config/fire";
import StudentDash from "./SubDashboards/StudentDash";
import CompanyDash from "./SubDashboards/CompanyDash";
import AdminDash from "./SubDashboards/AdminDash";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      authAs: null
    };
  }

  componentDidMount() {
    const authAs = localStorage.getItem("authAs");
    this.setState({ authAs });
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(user.displayName + " is logged in");
      } else {
        console.log("user Not signed in");
      }
    });
  }

  render() {
    const { authAs } = this.state;
    return (
      <div>
        <div className="container-fluid">
          {authAs === "student" ? (
            <StudentDash />
          ) : authAs === "company" ? (
            <CompanyDash />
          ) : authAs === "admin" ? (
            <AdminDash />
          ) : (
            <br />
          )}

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
