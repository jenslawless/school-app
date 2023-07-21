import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function StudentInfo({ setCurrentNewName }) {
  const location = useLocation();
  const studentInfo = location.state?.studentInfo || null;
  const currentCourse = location.state?.currentCourse || null;
  console.log(currentCourse);
  useEffect(() => {
    setCurrentNewName(currentCourse.name);
  }, []);
  return (
    <>
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
