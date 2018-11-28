import React, { Component } from "react";
import fire from "../../../config/fire";

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      show: "student",

      stdLogin_data: [],
      stdLoginEdit: {},
      stdResume: {},
      stdJobs: [],
      cmpLogin_date: []
    };
    this.studentLogin_remove = this.studentLogin_remove.bind(this);
    this.studentLogin_resume = this.studentLogin_resume.bind(this);
  }

  studentLogin_FUNC() {
    const { stdLogin_data } = this.state;
    fire
      .database()
      .ref("/student_data")
      .on("child_added", data => {
        fire
          .database()
          .ref("/student_resumes")
          .on("child_added", resume => {
            let obj = data.val();
            obj.resume = resume.val();
            stdLogin_data.push(obj);
            this.setState({ stdLogin_data });
          });
      });
  }
  studentLogin_modal() {
    let { stdLoginEdit } = this.state;
    return (
      <div
        className="modal fade"
        id="studentLoginModal1"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="studentLoginModal1Label"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="studentLoginModal1Label">
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
  studentLogin_resume() {
    let { stdResume } = this.state;
    return (
      <div
        className="modal fade"
        id="studentLoginModal2"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="studentLoginModal2Label"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="studentLoginModal2Label">
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
                value={stdResume.name}
                onChange={e => {
                  stdResume.name = e.target.value;
                  this.setState({ stdResume });
                }}
              />
              Father Name:{" "}
              <input
                type="text"
                className="form-control"
                value={stdResume.fatherName}
                onChange={e => {
                  stdResume.fatherName = e.target.value;
                  this.setState({ stdResume });
                }}
              />
              DOB:{" "}
              <input
                type="date"
                className="form-control"
                value={stdResume.dob}
                onChange={e => {
                  stdResume.dob = e.target.value;
                  this.setState({ stdResume });
                }}
              />
              Phone:{" "}
              <input
                type="text"
                className="form-control"
                value={stdResume.phone}
                onChange={e => {
                  stdResume.phone = e.target.value;
                  this.setState({ stdResume });
                }}
              />
              Email :
              <input
                type="text"
                className="form-control"
                value={stdResume.email}
                onChange={e => {
                  stdResume.email = e.target.value;
                  this.setState({ stdResume });
                }}
              />
              Qualification:{" "}
              <input
                type="text"
                className="form-control"
                value={stdResume.qualification}
                onChange={e => {
                  stdResume.qualification = e.target.value;
                  this.setState({ stdResume });
                }}
              />
              Percentage:{" "}
              <input
                type="text"
                className="form-control"
                value={stdResume.percentage}
                onChange={e => {
                  stdResume.percentage = e.target.value;
                  this.setState({ stdResume });
                }}
              />
              Experience:{" "}
              <input
                type="text"
                className="form-control"
                value={stdResume.experience}
                onChange={e => {
                  stdResume.experience = e.target.value;
                  this.setState({ stdResume });
                }}
              />
              Address:{" "}
              <input
                type="text"
                className="form-control"
                value={stdResume.address}
                onChange={e => {
                  stdResume.address = e.target.value;
                  this.setState({ stdResume });
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
                    .ref(`/student_resumes/${stdResume.uid}`)
                    .set(stdResume);
                  this.setState({ stdResume });
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
  studentLogin_remove(uid) {
    fire
      .database()
      .ref(`/student_data/${uid}`)
      .remove()
      .then(() => {
        this.setState({ stdLogin_data: [] });
        this.studentLogin_FUNC();
      });
  }
  studentJobs_FUNC() {
    let { stdJobs } = this.state
    fire.database().ref(`/student_data/`).on('value', data => {
      let obj = data.val()
      stdJobs = []
      for (const key in obj) {
        stdJobs.push(obj[key])
        this.setState({ stdJobs })
      }
    })
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        this.studentLogin_FUNC();
        this.studentJobs_FUNC()
      } else {
        console.log("user Not signed in");
      }
    });
  }

  render() {
    const { show, stdLogin_data, stdLoginEdit, stdResume, stdJobs } = this.state;

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
              <table className="table table-sm table-hover table-striped table-responsive">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Password</th>
                    <th scope="col">UID</th>
                    <th scope="col">Resume</th>
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
                            className="btn btn-info btn-sm btn-block"
                            data-toggle="modal"
                            data-target="#studentLoginModal2"
                            onClick={() => {
                              this.setState({ stdResume: v.resume });
                            }}
                          >
                            <i className="fa fa-address-card-o" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-success"
                            data-toggle="modal"
                            data-target="#studentLoginModal1"
                            onClick={() => {
                              this.setState({ stdLoginEdit: v });
                            }}
                          >
                            <i className="fa fa-edit" />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              this.studentLogin_remove(v.uid);
                            }}
                          >
                            <i className="fa fa-trash-o" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {stdResume && this.studentLogin_resume()}
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
              <table className="table table-sm table-hover table-striped table-responsive">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">UID</th>
                    <th scope="col">Inbox</th>
                    <th scope="col">Applications</th>
                    {/* <th scope="col">Manage</th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    stdJobs.map((v, i) => (
                      <tr key={v.uid + " " + i}>
                        <th scope="row">{i + 1}</th>
                        <td>{v.name}</td>
                        <td>{v.email}</td>
                        <td>{v.password}</td>
                        <td>{v.uid}</td>
                        <td>
                          <button
                            className="btn btn-info btn-sm btn-block"
                            data-toggle="modal"
                            data-target="#studentLoginModal2"
                            onClick={() => {
                              this.setState({ stdResume: v.resume });
                            }}
                          >
                            <i className="fa fa-address-card-o" />
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-success"
                            data-toggle="modal"
                            data-target="#studentLoginModal1"
                            onClick={() => {
                              this.setState({ stdLoginEdit: v });
                            }}
                          >
                            <i className="fa fa-edit" />
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => {
                              this.studentLogin_remove(v.uid);
                            }}
                          >
                            <i className="fa fa-trash-o" />
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
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
              <h3 className="text-center">Companies Post Data</h3>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default AdminDash;
