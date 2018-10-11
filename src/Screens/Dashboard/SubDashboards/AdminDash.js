import React, { Component } from "react";
import fire from "../../../config/fire";

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      show: "student",
      toggleView: false
    };
  }

  studentLogin_FUNC() {
    fire
      .database()
      .ref("/student_data")
      .once("value", data => {
        console.log(data.val());
      });
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.studentLogin_FUNC();
      } else {
        console.log("user Not signed in");
      }
    });
  }

  render() {
    const { show } = this.state;

    return (
      <div>
        <h3 className="text-info" style={{ marginTop: "10px" }}>
          Welcome Admin! ({localStorage.getItem("displayName")}){" "}
          <i className="fa fa-user-circle-o" />
          <button
            // style={{padding:'10px', marginTop:"10px"}}
            className="btn btn-info pull-right"
            onClick={() => {
              this.setState({
                show: show === "student" ? "company" : "student"
              });
            }}
          >
            Show {show === "student" ? "Company" : "Student"} Data
          </button>
        </h3>
        <br />
        <br />
        {show === "student" && (
          <div className="row">
            <div className="col-md-6">
              <h3
                className="text-center"
                style={{
                  margin: "10px",
                  backgroundColor: "whitesmoke",
                  minHeight: "75vh"
                }}
              >
                Students login detail
              </h3>
            </div>
            <div className="col-md-6">
              <h3
                className="text-center"
                style={{
                  margin: "10px",
                  backgroundColor: "whitesmoke",
                  minHeight: "75vh"
                }}
              >
                Students Job Data
              </h3>
            </div>
          </div>
        )}
        {show === "company" && (
          <div className="row">
            <div className="col-md-6">
              <h3
                className="text-center"
                style={{
                  margin: "10px",
                  backgroundColor: "whitesmoke",
                  minHeight: "75vh"
                }}
              >
                Companies login detail
              </h3>
            </div>
            <div className="col-md-6">
              <h3
                className="text-center"
                style={{
                  margin: "10px",
                  backgroundColor: "whitesmoke",
                  minHeight: "75vh"
                }}
              >
                Companies Post Data
              </h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AdminDash;
