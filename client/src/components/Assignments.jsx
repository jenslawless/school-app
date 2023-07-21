import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RightBar from "./RightBar";

function Assignments({ setCurrentName, currentUser }) {
  const [assignments, setAssignments] = useState([]);
  const [currentCourse, setCurrentCourse] = useState([]);
  const [shuffledAssignments, setShuffledAssignments] = useState([]); // State for shuffled assignments
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

  function getIndStudent(stuId, courseData) {
    console.log(currentCourse);
    const fetchIndStudent = async (stuId) => {
      try {
        const res = await fetch(`/api/students/${stuId}`);
        const myIndStudent = await res.json();
        navigate(`students/${stuId}`, {
          state: { studentInfo: myIndStudent, currentCourse: courseData },
        });
      } catch (error) {
        console.error("Error fetching indivstuIdual student:", error);
      }
    };
    console.log("getting here", currentCourse);
    fetchIndStudent(stuId);
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  useEffect(() => {
    if (currentUser.role === "Student") {
      const shuffledAssignments = [...assignments];
      shuffleArray(shuffledAssignments);
      setAssignments(shuffledAssignments);
    }
  }, [currentUser.role]);

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
                    <div className="border-2 border-black bg-cyan-800 text-white font-bold">
                      Assignment:{" "}
                      <p className="font-normal">{assignment.description}</p>
                    </div>
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
