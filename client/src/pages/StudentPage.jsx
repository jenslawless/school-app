import React, { useState } from "react";
import StudentInfo from "../components/StudentInfo";
import Menu from "../components/Menu";

function StudentPage({ currentCourse, currentUser }) {
  console.log("current user:", currentUser);
  console.log("current course:", currentCourse);
  //   console.log("current name:", currentName);
  const [currentNewName, setCurrentNewName] = useState("");

  return (
    <>
      <Menu
        currentUser={currentUser}
        currentName={currentNewName}
        toNavigate={"/courses"}
      />

      <StudentInfo
        currentCourse={currentCourse}
        setCurrentNewName={setCurrentNewName}
      />
    </>
  );
}

export default StudentPage;
