import React from "react";
import fire from "../../config/fire";

const Logout = () => {
  return (
    <span
      style={{ cursor: "pointer" }}
      onClick={() => {
        fire
          .auth()
          .signOut()
          .then(res => {
            alert("You are Logged Out");
          })
          .catch(err => {
            alert("Error during logging out \n" + err);
          });
      }}
    >
      Logout
    </span>
  );
};

export default Logout;
