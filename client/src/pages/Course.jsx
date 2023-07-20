import React from "react";
import Assignments from "../components/Assignments";
import Menu from "../components/Menu";

function Course({ currentUser }) {
  return (
    <div>
      <Menu />
      <Assignments currentUser={currentUser} />
    </div>
  );
}

export default Course;
