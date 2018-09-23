import React, { Component } from "react";
import fire from "../../../config/fire";

class CompanyDash extends Component {
  constructor() {
    super();
    this.state = {
      // form states
      title: '',
      description: '',
      salary: null,
      eligibility: null,
      skills: '',
      companyName: localStorage.getItem('displayName'),
      uid: localStorage.getItem('uid'),
      time: new Date().toLocaleString(),
      // other states
      show: "newJob"
    };
    this.postAJob_FUNC = this.postAJob_FUNC.bind(this);
  }

  postAJob_FUNC() {
    const { title, description, salary, eligibility, skills, companyName, uid, time } = this.state
    fire.database().ref(`/company_jobs/${uid}/`).push({ title, description, salary, eligibility, skills, companyName, uid, time }).then(() => {
      window.location = '/dashboard'
    })
  }

  postAJob_JSX() {
    const { companyName } = this.state
    return (
      <div>
        <h1 className="text-uppercase text-danger">Post a new Job</h1><br />
        <div className="form-group">
          <label>Company Name:</label>
          <input type="text" className="form-control" value={companyName} readOnly />
        </div>
        <div className="form-group">
          <label>Job Title:</label>
          <input type="text" className="form-control" onChange={(e) => { this.setState({ title: e.target.value }) }} />
        </div>
        <div className="form-group">
          <label>Job Description:</label>
          <textarea cols="30" rows="5" className="form-control" onChange={(e) => { this.setState({ description: e.target.value }) }} ></textarea>
        </div>
        <div className="form-group">
          <label>Salary:</label>
          <input type="number" className="form-control" onChange={(e) => { this.setState({ salary: e.target.value }) }} />
        </div>
        <div className="form-group">
          <label>Eligibility:</label>
          <input type="number" className="form-control" onChange={(e) => { this.setState({ eligibility: e.target.value }) }} placeholder="vacancies" />
        </div>
        <div className="form-group">
          <label>Skills:</label>
          <input type="text" className="form-control" onChange={(e) => { this.setState({ skills: e.target.value }) }} placeholder="comma separated values" />
        </div>
        <button className="btn btn-dark  btn-block btn-lg" onClick={this.postAJob_FUNC} >Submit</button>
        <br />
      </div>
    )
  }

  render() {
    const { show } = this.state
    return (
      <div className="container-fluid">
        {/* <p>CompanyDash</p> */}
        <div className="row">
          <div className="col-md-9">
            <br />
            {
              show === "newJob"
                ? this.postAJob_JSX()
                : show === "findStudents"
                  ? <div>RENDER: Find Students</div>
                  : show === "inbox"
                    ? <div>RENDER: Inbox</div>
                    : show === "myPosts"
                      ? <div>RENDER: My Posts</div>
                      : <br />
            }
          </div>
          <div className="col-md-3">
            <br />
            <button className="btn btn-block btn-sm btn-outline-primary" onClick={() => {
              this.setState({ show: "newJob" });
            }}>
              Post a new job
            </button>
            <button className="btn btn-block btn-sm btn-primary" onClick={() => {
              this.setState({ show: "findStudents" });
            }}>
              Find Students
            </button>
            <hr />
            <button className="btn btn-block btn-sm btn-primary" onClick={() => {
              this.setState({ show: "inbox" });
            }}>Inbox</button>
            <button className="btn btn-block btn-sm btn-primary" onClick={() => {
              this.setState({ show: "myPosts" });
            }}>
              My Posts
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CompanyDash;
