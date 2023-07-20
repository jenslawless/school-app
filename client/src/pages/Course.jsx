import React, { useState } from "react";
import Assignments from "../components/Assignments";
import Menu from "../components/Menu";

function Course({ currentUser }) {
  const [currentName, setCurrentName] = useState("");
  return (
    <div>
      <Menu
        currentUser={currentUser}
        currentName={currentName}
        toNavigate={"/courses"}
      />
      <Assignments setCurrentName={setCurrentName} currentUser={currentUser} />
    </div>
  );
}

export default Course;
