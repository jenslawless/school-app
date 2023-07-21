import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Assignments({ setCurrentName, currentUser }) {
  const [assignments, setAssignments] = useState([]);
  const [currentCourse, setCurrentCourse] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();



  function getAssignments() {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const myAssignments = await res.json();
        setCurrentCourse(myAssignments);
        setAssignments(myAssignments.assignments); // Update the assignments state with fetched data
        setCurrentName(myAssignments.name);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments(); // Call fetchAssignments without the 'id' argument
  }

  useEffect(() => {
    getAssignments(); // Call getAssignments when the component mounts
  }, []);


  function getIndStudent(id, courseData) {
    console.log(currentCourse)
    const fetchIndStudent = async (id) => {
      try {
        const res = await fetch(`/api/students/${id}`);
        const myIndStudent = await res.json();
        navigate(`/students/${id}`, { state: { studentInfo: myIndStudent, currentCourse: courseData } });
      } catch (error) {
        console.error("Error fetching individual student:", error);
      }
    };
    console.log("getting here", currentCourse)
    fetchIndStudent(id);
  }


  return (
    <>
      <div className="grid grid-cols-2 pl-24 pt-8">
        <div className="grid grid-cols-2">
          {currentUser.role === "Student" ? (
            assignments.map((assignment, index) => {
              // Find the grade for the current assignment
              const grade = currentUser.grades.find(
                (g) => g.assignment_id === assignment.id
              );

              return (
                <div className="space-x-1" key={index}>
                  <div className="grid grid-cols-2 ">
                    <p className="border-2 border-black bg-cyan-800 text-white font-bold">
                      Assignment:{" "}
                      <p className="font-normal">{assignment.description}</p>
                    </p>
                    <p className="border-2 border-black bg-neutral-300 w-16">
                      Grade: {grade ? grade.value : "Not graded"}%
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <>
              <h1>Students:</h1>
              {currentCourse.students?.map((stu) => (
                <div className="space-x-1" key={stu.id}>
                  <div
                    className="cursor-pointer"
                    onClick={() => getIndStudent(stu.id, currentCourse)}
                  >
                    {stu.name}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Assignments;
