import React, { Component } from "react";
import fire from "../../../config/fire";

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      show: "student",

      stdLogin_data: [],
      stdLoginEdit: null,

      cmpLogin_date: []
    };
  }

  studentLogin_FUNC() {
    const { stdLogin_data } = this.state;
    fire
      .database()
      .ref("/student_data")
      .once("value", data => {
        let obj = data.val();
        for (const key in obj) {
          stdLogin_data.push(obj[key]);
        }
        this.setState({ stdLogin_data });
      });
  }
  studentLogin_modal() {
    const { stdLoginEdit } = this.state;
    return (
      <div
        className="modal fade"
        id="studentLoginModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="studentLoginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="studentLoginModalLabel">
                Edit
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Name:{" "}
              <input
                type="text"
                className="form-control"
                value={stdLoginEdit.name}
                onChange={e => {
                  stdLoginEdit.name = e.target.value;
                  this.setState({ stdLoginEdit });
                }}
              />
              Email:{" "}
              <input
                type="text"
                className="form-control"
                value={stdLoginEdit.email}
                onChange={e => {
                  stdLoginEdit.email = e.target.value;
                  this.setState({ stdLoginEdit });
                }}
              />
              Password:{" "}
              <input
                type="text"
                className="form-control"
                value={stdLoginEdit.password}
                onChange={e => {
                  stdLoginEdit.password = e.target.value;
                  this.setState({ stdLoginEdit });
                }}
              />
              UID:{" "}
              <input
                type="text"
                className="form-control"
                value={stdLoginEdit.uid}
                onChange={e => {
                  stdLoginEdit.uid = e.target.value;
                  this.setState({ stdLoginEdit });
                }}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  fire
                    .database()
                    .ref(`/student_data/${stdLoginEdit.uid}`)
                    .set(stdLoginEdit);
                  this.setState({ stdLoginEdit });
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
    const { show, stdLogin_data, stdLoginEdit } = this.state;

    return (
      <div>
        <h3 className="text-info" style={{ marginTop: "10px" }}>
          Welcome Admin! ({localStorage.getItem("displayName")})
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
            <div
              className="col-md-6"
              style={{
                backgroundColor: "whitesmoke",
                minHeight: "75vh"
              }}
            >
              <h3 className="text-center">Students login detail</h3>
              <table class="table table-sm table-hover table-striped table-responsive">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">UID</th>
                    <th scope="col">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {stdLogin_data.map((v, i) => {
                    return (
                      <tr key={v.uid + " " + i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.name}</td>
                        <td>{v.email}</td>
                        <td>{v.password}</td>
                        <td>{v.uid}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-success"
                            data-toggle="modal"
                            data-target="#studentLoginModal"
                            onClick={() => {
                              this.setState({ stdLoginEdit: v });
                            }}
                          >
                            <i className="fa fa-edit" />
                          </button>
                          <button className="btn btn-sm btn-danger">
                            <i className="fa fa-trash-o" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {stdLoginEdit && this.studentLogin_modal()}
            </div>
            <div
              className="col-md-6"
              style={{
                backgroundColor: "whitesmoke",
                minHeight: "75vh"
              }}
            >
              <h3 className="text-center">Students Job Data</h3>
            </div>
          </div>
        )}
        {show === "company" && (
          <div className="row">
            <div
              className="col-md-6"
              style={{
                backgroundColor: "whitesmoke",
                minHeight: "75vh"
              }}
            >
              <h3 className="text-center">Companies login detail</h3>
            </div>
            <div
              className="col-md-6"
              style={{
                backgroundColor: "whitesmoke",
                minHeight: "75vh"
              }}
            >
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
