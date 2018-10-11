import React, { Component } from "react";
import fire from "../../../config/fire";
import moment from "moment";


class StudentDash extends Component {
  constructor() {
    super();
    this.state = {
      name: localStorage.getItem("displayName"),
      fatherName: "",
      dob: "",
      phone: "",
      email: localStorage.getItem("email"),
      address: "",
      qualification: "",
      percentage: null,
      experience: "",
      // other states
      checkInfo: false,
      resume: null,
      content: "myInfo",
      jobs: [],
      myApplications: []
    };
    this.submitMyInfo = this.submitMyInfo.bind(this);
  }

  submitMyInfo() {
    const {
      name,
      fatherName,
      dob,
      phone,
      email,
      address,
      qualification,
      percentage,
      experience
    } = this.state;

    if (
      name &&
      fatherName &&
      dob &&
      phone &&
      email &&
      address &&
      qualification &&
      percentage &&
      experience
    ) {
      let studentResume = {
        name,
        fatherName,
        dob,
        phone,
        email,
        address,
        qualification,
        percentage,
        experience,
        uid: fire.auth().currentUser.uid
      };
      // console.log(studentResume);
      fire
        .database()
        .ref(`/student_resumes`)
        .child(fire.auth().currentUser.uid)
        .set(studentResume);
    } else {
      alert("please fill all fields");
    }
  }

  componentWillMount() {
    fire
      .database()
      .ref(`/student_resumes`)
      .child(localStorage.getItem("uid"))
      .on("value", data => {
        let resume = data.val();
        // console.log(resume);
        if (resume) {
          this.setState({ checkInfo: true, resume });
          // this.mySavedInfo(resume);
        } else {
          this.setState({ checkInfo: false });
        }
      });
  }

  mySavedInfo() {
    const { resume } = this.state;
    // console.log(resume);
    return (
      <div>
        <h1 className="text-uppercase text-primary">My Info</h1>
        <label>
          Name:
          <input
            type="text"
            disabled
            value={resume.name}
            className="form-control"
          />
        </label>
        <label>
          Father Name:
          <input
            type="text"
            placeholder="father name"
            disabled
            value={resume.fatherName}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            disabled
            value={resume.dob}
            className="form-control"
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            placeholder="03xxxxxxxxx"
            maxLength="11"
            disabled
            value={resume.phone}
            className="form-control"
          />
        </label>
        <label>
          Email Address:
          <input
            type="email"
            disabled
            value={resume.email}
            className="form-control"
          />
        </label>
        <br />
        <span>
          Physical Address
          <input
            type="text"
            style={{ maxWidth: "600px" }}
            disabled
            value={resume.address}
            className="form-control"
          />
        </span>
        <br />
        <label>
          Qualification:
          <select
            disabled
            value={resume.qualification}
            className="form-control"
          >
            <option disabled>Select One:</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
          </select>
        </label>
        <label>
          Percentage:
          <input
            type="number"
            placeholder="90"
            disabled
            value={resume.percentage}
            className="form-control"
          />
        </label>
        <label>
          Experience:
          <input
            type="text"
            placeholder="1 year"
            disabled
            value={resume.experience}
            className="form-control"
          />
        </label>
      </div>
    );
    // }
  }

  myUnsavedInfo() {
    return (
      <div>
        <h1 className="text-uppercase text-primary">My Info</h1>
        <label>
          Name:
          <input
            type="text"
            disabled
            value={localStorage.getItem("displayName")}
            className="form-control"
          />
        </label>
        <label>
          Father Name:
          <input
            type="text"
            placeholder="father name"
            onChange={e => {
              this.setState({ fatherName: e.target.value });
            }}
            className="form-control"
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            onChange={e => {
              this.setState({ dob: e.target.value });
            }}
            className="form-control"
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            placeholder="03xxxxxxxxx"
            maxLength="11"
            onChange={e => {
              this.setState({ phone: e.target.value });
            }}
            className="form-control"
          />
        </label>
        <label>
          Email Address:
          <input
            type="email"
            disabled
            value={localStorage.getItem("email")}
            className="form-control"
          />
        </label>
        <br />
        <span>
          Physical Address
          <input
            type="text"
            style={{ maxWidth: "600px" }}
            onChange={e => {
              this.setState({ address: e.target.value });
            }}
            className="form-control"
          />
        </span>
        <br />
        <label>
          Qualification:
          <select
            defaultValue="Select One:"
            onChange={e => {
              this.setState({ qualification: e.target.value });
            }}
            className="form-control"
          >
            <option disabled>Select One:</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="Bachelors">Bachelors</option>
            <option value="Masters">Masters</option>
          </select>
        </label>
        <label>
          Percentage:
          <input
            type="number"
            placeholder="90"
            onChange={e => {
              this.setState({ percentage: e.target.value });
            }}
            className="form-control"
          />
        </label>
        <label>
          Experience:
          <input
            type="text"
            placeholder="1 year"
            onChange={e => {
              this.setState({ experience: e.target.value });
            }}
            className="form-control"
          />
        </label>
        <button
          type="submit"
          style={{ maxWidth: "600px" }}
          className="btn btn-warning btn-lg btn-block"
          onClick={this.submitMyInfo}
        >
          Submit
        </button>
      </div>
    );
  }

  renderJobs() {
    let { jobs } = this.state;
    // document.getElementById("jobs");
    fire
      .database()
      .ref("/company_jobs")
      .on("child_added", data => {
        let job = data.val();
        for (const key in job) {
          // console.log(job[key]);
          jobs.push(job[key]);
        }
        this.setState({ jobs });
      });
  }

  apply(companyUID, jobTitle, jobDescription) {
    fire
      .database()
      .ref(`/student_resumes`)
      .child(fire.auth().currentUser.uid)
      .once("value", data => {
        let resume = data.val();
        fire
          .database()
          .ref(
            `/company_data/${companyUID}/inbox/${fire.auth().currentUser.uid}/`
          )
          .push({
            jobTitle,
            jobDescription,
            resumeOfApplicant: resume
          })
          .then(res => {
            fire
              .database()
              .ref(`/company_data/${companyUID}`)
              .once("value", data => {
                let companyInfo = data.val();
                // console.log(companyInfo);
                fire
                  .database()
                  .ref(
                    `/student_data/${
                      fire.auth().currentUser.uid
                    }/my_applications/${companyUID}`
                  )
                  .push({
                    jobTitle,
                    jobDescription,
                    companyName: companyInfo.name,
                    companyEmail: companyInfo.email
                  });
                alert("Your resume has been successfully submitted");
              });
          });
      });
  }

  myApplications() {
    const { myApplications } = this.state;
    fire
      .database()
      .ref(`/student_data/${fire.auth().currentUser.uid}/my_applications`)
      .on("child_added", data => {
        let myApps = data.val();
        // console.log(myApps);
        for (const key in myApps) {
          myApplications.push(myApps[key]);
        }
        // console.log(myApplications)
        this.setState({ myApplications });
      });
  }

  render() {
    const authAs = localStorage.getItem("authAs");
    const { checkInfo, content, jobs, myApplications } = this.state;
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9">
              <br />
              {content === "myInfo" ? (
                checkInfo ? (
                  this.mySavedInfo()
                ) : (
                  this.myUnsavedInfo()
                )
              ) : content === "myApplications" ? (
                <div>
                  <h1 className="text-uppercase text-success">
                    My Applications
                  </h1>
                  {myApplications.map((v, i) => {
                    return (
                      <div
                        className="card mb-3 border-primary"
                        key={`${v}_${i}`}
                      >
                        <div className="card-body">
                          <h5 className="card-title text-primary">
                            Job Title: {v.jobTitle}
                          </h5>
                          <p className="card-text">
                            Description: {v.jobDescription}
                          </p>
                          <p className="card-text">Company: {v.companyName}</p>
                          <p className="card-text">
                            Company Email: {v.companyEmail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : content === "findAJob" ? (
                <div>
                  <h1 className="text-uppercase text-danger">Find A Job</h1>
                  <div>
                    {jobs.map((job, index) => {
                      return (
                        <div
                          className="card text-white bg-dark mb-3"
                          // style={{ maxWidth: "18rem" }}
                        >
                          <div className="card-header">
                            <div className="row">
                              <div className="col-11">{job.companyName}</div>
                              <div className="col-1">
                                <i className="fa fa-star" />
                              </div>
                            </div>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{job.title}</h5>
                            <p className="card-text">{job.description}</p>
                            <p className="card-text">Skills: {job.skills}</p>
                            <div
                              className="row text-warning"
                              style={{ fontSize: "10pt" }}
                            >
                              <div className="col">
                                Eligibility: {job.eligibility}
                              </div>
                              <div className="col">Salary: {job.salary}</div>
                            </div>
                          </div>
                          <div className="card-footer">
                            <div className="row">
                              <div className="col-md-10">Post Date: {moment(job.time).fromNow()}</div>
                              <div className="col-md-2">
                                <button
                                  className="btn btn-block btn-sm btn-primary"
                                  onClick={this.apply.bind(
                                    this,
                                    job.uid,
                                    job.title,
                                    job.description
                                  )}
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <br />
              )}
            </div>

            <div className="col-md-3">
              <ul className="navbar-nav">
                <li className="nav-link">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      this.componentWillMount();
                      this.setState({ content: "myInfo" });
                    }}
                  >
                    My Info
                  </button>
                </li>
                <li className="nav-link">
                  <button
                    className="btn btn-success btn-block"
                    onClick={() => {
                      this.setState({ content: "myApplications" });
                      this.myApplications();
                    }}
                  >
                    My Applications
                  </button>
                </li>
                <li className="nav-link">
                  <button
                    className="btn btn-danger btn-block"
                    onClick={() => {
                      this.setState({ content: "findAJob" });
                      this.renderJobs();
                    }}
                  >
                    Find a Job
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
export default StudentDash;
