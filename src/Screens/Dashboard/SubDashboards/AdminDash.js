import React, { Component } from "react";
import fire from "../../../config/fire";

class AdminDash extends Component {
  constructor() {
    super();
    this.state = {
      show: "company",

      stdLogin_data: [],
      stdLoginEdit: {},
      stdResume: {},
      stdJobs: [],
      stdApplication: {},

      cmpLogin_data: [],
      cmpLogin_modal: {}
    };
    this.studentLogin_remove = this.studentLogin_remove.bind(this);
    this.studentLogin_resume = this.studentLogin_resume.bind(this);
    this.studentAppliactions_modal = this.studentAppliactions_modal.bind(this);
    this.companyLogin_FUNC = this.companyLogin_FUNC.bind(this);
    this.companyLogin_Modal = this.companyLogin_Modal.bind(this);
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
    let { stdJobs } = this.state;
    fire
      .database()
      .ref(`/student_data/`)
      .on("value", data => {
        let obj = data.val();
        stdJobs = [];
        for (const key in obj) {
          stdJobs.push(obj[key]);
          this.setState({ stdJobs });
        }
      });
  }
  studentAppliactions_modal() {
    let { stdApplication } = this.state;
    let data = [];
    let stdUid = stdApplication.stdUid;

    for (const key in stdApplication) {
      for (const key2 in stdApplication[key]) {
        data.push(stdApplication[key][key2]);
      }
    }

    return data.map((v, i) => (
      <div
        className="modal fade"
        id="studentApplicationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="studentApplicationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="studentApplicationModal">
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
              Job Tittle
              <input
                type="text"
                value={v.jobTitle}
                onChange={e => {
                  v.jobTitle = e.target.value;
                }}
                className="form-control"
              />
              Job Description
              <input
                type="text"
                value={v.jobDescription}
                onChange={e => {
                  v.jobDescription = e.target.value;
                }}
                className="form-control"
              />
              Company Name
              <input
                type="text"
                value={v.companyName}
                onChange={e => {
                  v.companyEmail = e.target.value;
                }}
                className="form-control"
              />
              Company Email
              <input
                type="text"
                value={v.companyEmail}
                onChange={e => {
                  v.companyEmail = e.target.value;
                }}
                className="form-control"
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
                  delete stdApplication.stdUid;
                  fire
                    .database()
                    .ref(`/student_data/${stdUid}/my_applications/`)
                    .set(stdApplication);
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    ));
  }

  companyLogin_FUNC() {
    const { cmpLogin_data } = this.state;
    fire
      .database()
      .ref("/company_data")
      .on("child_added", data => {
        let obj = data.val();
        // obj.resume = resume.val();
        cmpLogin_data.push(obj);
      });
    this.setState({ cmpLogin_data });
  }
  companyLogin_Modal() {
    const cmp = this.state.cmpLogin_modal;
    var hire = [];
    var inbox = [];

    for (const key in cmp.hire) {
      hire.push(cmp.hire[key]);
    }

    for (const key in cmp.inbox) {
      var flagArr = [];
      for (const key2 in cmp.inbox[key]) {
        flagArr.push(cmp.inbox[key][key2]);
      }
      inbox.push({ [key]: flagArr });
    }

    return (
      <div
        class="modal fade"
        id="cmp-login"
        tabindex="-1"
        role="dialog"
        aria-labelledby="cmp-login-Label"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="cmp-loginLabel">
                Edit
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              Name
              <input
                type="text"
                className="form-control"
                value={cmp.name}
                onChange={e => {
                  cmp.name = e.target.value;
                  this.setState({ cmpLogin_modal: cmp });
                }}
              />
              Email
              <input
                type="text"
                className="form-control"
                value={cmp.email}
                onChange={e => {
                  cmp.email = e.target.value;
                  this.setState({ cmpLogin_modal: cmp });
                }}
              />
              Password
              <input
                type="text"
                className="form-control"
                value={cmp.password}
                onChange={e => {
                  cmp.password = e.target.value;
                  this.setState({ cmpLogin_modal: cmp });
                }}
              />
              UID
              <input
                type="text"
                className="form-control"
                value={cmp.uid}
                onChange={e => {
                  cmp.uid = e.target.value;
                  this.setState({ cmpLogin_modal: cmp });
                }}
              />
              <hr />
              {hire.map((v, i) => {
                // console.log(v);

                return (
                  <div className="accordion" id="accordionExample">
                    <div class="card">
                      <div class="card-header" id={`heading${i}`}>
                        <h5 class="mb-0">
                          <button
                            class="btn btn-link"
                            type="button"
                            data-toggle="collapse"
                            data-target={`#collapse${i}`}
                            aria-expanded="true"
                            aria-controls={`collapse${i}`}
                          >
                            {v.name}
                          </button>
                        </h5>
                      </div>

                      <div
                        id={`collapse${i}`}
                        class="collapse"
                        aria-labelledby={`heading${i}`}
                        data-parent="#accordionExample"
                      >
                        <div class="card-body">
                          Name
                          <input
                            type="text"
                            className="form-control"
                            value={v.name}
                            onChange={e => {
                              v.name = e.target.value;
                              cmp.hire[v.uid] = v;
                              this.setState({ cmpLogin_modal: cmp });
                            }}
                          />
                          Father Name
                          <input
                            type="text"
                            className="form-control"
                            value={v.fatherName}
                            onChange={e => {
                              v.fatherName = e.target.value;
                              cmp.hire[v.uid] = v;
                              this.setState({ cmpLogin_modal: cmp });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  fire
                    .database()
                    .ref(`/company_data/${cmp.uid}/`)
                    .set(cmp);
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
        this.studentJobs_FUNC();
        this.companyLogin_FUNC();
      } else {
        console.log("user Not signed in");
      }
    });
  }

  render() {
    const {
      show,
      stdLogin_data,
      stdLoginEdit,
      stdResume,
      stdJobs,
      stdApplication,
      cmpLogin_data
    } = this.state;

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
                  {stdJobs.map((v, i) => (
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
                          data-target="#studentApplicationModal"
                          onClick={() => {
                            v.my_applications.stdUid = v.uid;
                            this.setState({
                              stdApplication: v.my_applications
                            });
                          }}
                        >
                          <i className="fa fa-address-card-o" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {stdApplication && this.studentAppliactions_modal()}
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

              <table className="table table-sm table-hover table-striped table-responsive">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">UID</th>
                    <th scope="col">Inbox</th>
                    <th scope="col">Manage</th>
                  </tr>
                </thead>
                <tbody>
                  {cmpLogin_data.map((v, i) => (
                    <tr key={v.uid + " " + i}>
                      <th scope="row">{i + 1}</th>
                      <td>{v.name}</td>
                      <td>{v.email}</td>
                      <td>{v.password}</td>
                      <td>{v.uid}</td>
                      <td>
                        <button
                          className="btn btn-info btn-sm"
                          data-toggle="modal"
                          data-target="#cmp-login"
                          onClick={() => {
                            this.setState({
                              cmpLogin_modal: v
                            });
                          }}
                        >
                          <i className="fa fa-pencil" />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {}}
                        >
                          <i className="fa fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                {this.companyLogin_Modal()}
              </table>
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
