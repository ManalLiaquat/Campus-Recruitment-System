import React, { Component } from "react";
import fire from "../../../config/fire";
import moment from "moment";

class CompanyDash extends Component {
  constructor() {
    super();
    this.state = {
      // form states
      title: "",
      description: "",
      salary: null,
      eligibility: null,
      skills: "",
      companyName: localStorage.getItem("displayName"),
      uid: localStorage.getItem("uid"),
      time: Date.now(),
      // other states
      show: "myPosts",
      studentArr: [],
      inbox: [],
      myPosts: []
    };
    this.postAJob_FUNC = this.postAJob_FUNC.bind(this);
    this.findStudents_FUNC = this.findStudents_FUNC.bind(this);
    this.inbox_FUNC = this.inbox_FUNC.bind(this);
    this.myPosts_FUNC = this.myPosts_FUNC.bind(this);
  }

  postAJob_FUNC() {
    const {
      title,
      description,
      salary,
      eligibility,
      skills,
      companyName,
      uid,
      time
    } = this.state;
    fire
      .database()
      .ref(`/company_jobs/${uid}/`)
      .push({
        title,
        description,
        salary,
        eligibility,
        skills,
        companyName,
        uid,
        time
      })
      .then(() => {
        window.location = "/dashboard";
      });
  }

  postAJob_JSX() {
    const { companyName } = this.state;
    return (
      <div>
        <h1 className="text-uppercase text-danger">Post a new Job</h1>
        <br />
        <div className="form-group">
          <label>Company Name:</label>
          <input
            type="text"
            className="form-control"
            value={companyName}
            readOnly
          />
        </div>
        <div className="form-group">
          <label>Job Title:</label>
          <input
            type="text"
            className="form-control"
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Job Description:</label>
          <textarea
            cols="30"
            rows="5"
            className="form-control"
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input
            type="number"
            className="form-control"
            onChange={e => {
              this.setState({ salary: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label>Eligibility:</label>
          <input
            type="number"
            className="form-control"
            onChange={e => {
              this.setState({ eligibility: e.target.value });
            }}
            placeholder="vacancies"
          />
        </div>
        <div className="form-group">
          <label>Skills:</label>
          <input
            type="text"
            className="form-control"
            onChange={e => {
              this.setState({ skills: e.target.value });
            }}
            placeholder="comma separated values"
          />
        </div>
        <button
          className="btn btn-dark  btn-block btn-lg"
          onClick={this.postAJob_FUNC}
        >
          Submit
        </button>
        <br />
      </div>
    );
  }

  findStudents_FUNC() {
    let { studentArr } = this.state;
    fire
      .database()
      .ref("/student_resumes")
      .once("value", data => {
        let studentData = data.val();
        // console.log(studentData);
        for (const key in studentData) {
          studentArr.push(studentData[key]);
        }
        this.setState({ studentArr });
      });
  }

  hire(studentData) {
    fire
      .database()
      .ref(
        `/company_data/${fire.auth().currentUser.uid}/hire/${studentData.uid}/`
      )
      .set(studentData)
      .then(() => {
        fire
          .database()
          .ref(
            `/student_data/${studentData.uid}/inbox/${
              fire.auth().currentUser.uid
            }/`
          )
          .set({
            companyName: fire.auth().currentUser.displayName,
            companyEmail: fire.auth().currentUser.email,
            uid: fire.auth().currentUser.uid
          });
        alert("Notification sent");
      });
  }

  inbox_FUNC() {
    const { inbox } = this.state;
    fire
      .database()
      .ref(`/company_data/${fire.auth().currentUser.uid}/inbox/`)
      .once("value", data => {
        let allData = data.val();
        for (const student_uid in allData) {
          for (const pushKey in allData[student_uid]) {
            // console.log(allData[student_uid][pushKey]);
            // console.log(student_uid);
            inbox.push(allData[student_uid][pushKey]);
          }
        }
        this.setState({ inbox });
      });
  }

  myPosts_FUNC() {
    const { myPosts } = this.state;
    fire
      .database()
      .ref(`/company_jobs/${fire.auth().currentUser.uid}/`)
      .on("value", data => {
        let allPosts = data.val();
        for (const key in allPosts) {
          // console.log(allPosts[key]);
          myPosts.push(allPosts[key]);
        }
      });
    this.setState({ myPosts });
  }

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        // console.log(user.displayName + " is logged in");
        this.myPosts_FUNC();
        this.findStudents_FUNC();
        this.inbox_FUNC();
      } else {
        // console.log("user Not signed in");
      }
    });
  }

  render() {
    const { show, studentArr, inbox, myPosts } = this.state;
    // console.log(inbox);

    return (
      <div className="container-fluid">
        {/* <p>CompanyDash</p> */}
        <div className="row">
          <div className="col-md-10">
            <br />
            {show === "newJob" ? (
              this.postAJob_JSX()
            ) : show === "findStudents" ? (
              <div>
                <h1 className="text-danger">Find Students</h1>
                <table className="table table-hover table-responsive table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Father Name</th>
                      <th scope="col">DOB</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Email</th>
                      <th scope="col">Qualification</th>
                      <th scope="col">Percentage</th>
                      <th scope="col">Experience</th>
                      <th scope="col">Address</th>
                      <th scope="col">Hire</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentArr.map((v, i) => {
                      return (
                        <tr key={`${v.uid}`}>
                          <th scope="row">{i + 1}</th>
                          <td>{v.name}</td>
                          <td>{v.fatherName}</td>
                          <td>{v.dob}</td>
                          <td>{v.phone}</td>
                          <td>{v.email}</td>
                          <td>{v.qualification}</td>
                          <td>{v.percentage}</td>
                          <td>{v.experience}</td>
                          <td>{v.address}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-flat"
                              onClick={() => {
                                this.hire(v);
                              }}
                            >
                              Hire
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : show === "inbox" ? (
              <div>
                <h1 className="text-danger">Inbox</h1>
                <table className="table table-responsive table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Job Title</th>
                      <th scope="col">Job Description</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">DOB</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Email</th>
                      <th scope="col">Qualification</th>
                      <th scope="col">Percentage</th>
                      <th scope="col">Experience</th>
                      {/* <th scope="col">Hire</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {inbox.map((data, i) => {
                      let v = data.resumeOfApplicant;
                      return (
                        <tr key={`${v.jobTitle}_${i}`}>
                          <th scope="row">{i + 1}</th>
                          <td>{data.jobTitle}</td>
                          <td>{data.jobDescription}</td>
                          <td>{v.name}</td>
                          <td>{v.dob}</td>
                          <td>{v.phone}</td>
                          <td>{v.email}</td>
                          <td>{v.qualification}</td>
                          <td>{v.percentage}</td>
                          <td>{v.experience}</td>
                          {/* <td>
                            <button
                              className="btn btn-outline-success btn-block"
                              onClick={() => {
                                // some func here
                              }}
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-outline-danger btn-block"
                              onClick={() => {
                                // some func here 
                              }}
                            >
                              Reject
                            </button>
                          </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : show === "myPosts" ? (
              <div>
                <h1 className="text-danger">My Posts</h1>
                <table className="table table-responsive table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Job Title</th>
                      <th scope="col">Job Description</th>
                      <th scope="col">Salary</th>
                      <th scope="col">Eligibility</th>
                      <th scope="col">Skills</th>
                      <th scope="col">Posting Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myPosts.map((v, i) => {
                      return (
                        <tr key={`${v.title}_${i}`}>
                          <th scope="row">{i + 1}</th>
                          <td>{v.title}</td>
                          <td>{v.description}</td>
                          <td>{v.salary}</td>
                          <td>{v.eligibility}</td>
                          <td>{v.skills}</td>
                          <td>{moment(v.time).fromNow()}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <br />
            )}
          </div>
          <div className="col-md-2">
            <br />
            <button
              className="btn btn-block btn-sm btn-outline-primary"
              onClick={() => {
                this.setState({ show: "newJob" });
                window.location.hash = "newJob";
              }}
            >
              Post a new job
            </button>
            <button
              className="btn btn-block btn-sm btn-primary"
              onClick={() => {
                this.setState({ show: "findStudents" });
                window.location.hash = "findStudents";
              }}
            >
              Find Students
            </button>
            <hr />
            <button
              className="btn btn-block btn-sm btn-primary"
              onClick={() => {
                this.setState({ show: "inbox" });
                window.location.hash = "inbox";
              }}
            >
              Inbox
            </button>
            <button
              className="btn btn-block btn-sm btn-primary"
              onClick={() => {
                this.setState({ show: "myPosts" });
                window.location.hash = "myPosts";
              }}
            >
              My Posts
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyDash;
