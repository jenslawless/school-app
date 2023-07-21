import React from "react";
import { useLocation } from "react-router-dom";

function StudentInfo({}) {
  const location = useLocation();
  const studentInfo = location.state?.studentInfo || null;
  const currentCourse = location.state?.currentCourse || null;

  console.log(studentInfo);
  console.log(currentCourse);

  return (
    <>
      <div className="pl-24 pt-8">Student Name: {studentInfo.name}</div>
      <div className="pl-24 pt-8">Course Name: {currentCourse.name}</div>
      <div className="pl-24 pt-8">
        Assignments:{" "}
        {currentCourse.assignments.map((ass) => {
          const grade = studentInfo.grades.find(
            (g) => g.assignment_id === ass.id
          );
          return (
            <>
              <p>
                <li>
                  {ass.description}: {grade.value}%
                </li>
              </p>
            </>
          );
        })}
      </div>
    </>
  );
}

export default StudentInfo;
