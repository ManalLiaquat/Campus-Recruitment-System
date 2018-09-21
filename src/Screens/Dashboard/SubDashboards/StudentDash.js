import React, { Component } from "react";
import fire from "../../../config/fire";

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
      checkInfo: false,
      resume: null
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
        experience
      };
      console.log(studentResume);
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
    console.log(resume);
    return (
      <div>
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

  render() {
    const authAs = localStorage.getItem("authAs");
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <ul className="navbar-nav">
                <li className="nav-link">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => {
                      this.componentWillMount();
                    }}
                  >
                    My Info
                  </button>
                </li>
                <li className="nav-link">
                  <button className="btn btn-success btn-block">
                    My Applications
                  </button>
                </li>
                <li className="nav-link">
                  <button className="btn btn-danger btn-block">
                    Find a Job
                  </button>
                </li>
              </ul>
            </div>
            <div className="col-md-9">
              <h1
                style={{
                  textTransform: "uppercase"
                }}
              >
                Dashboard
              </h1>
              <br />
              {this.state.checkInfo ? this.mySavedInfo() : this.myUnsavedInfo()}
            </div>
          </div>
        </div>
        <hr />
      </div>
    );
  }
}
export default StudentDash;
