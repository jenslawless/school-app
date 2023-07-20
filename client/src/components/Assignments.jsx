import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Assignments({ currentUser }) {
  const [assignments, setAssignments] = useState([]);
  const { id } = useParams();
  //   console.log(id);

  function getAssignments() {
    const fetchAssignments = async () => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const myAssignments = await res.json();
        setAssignments(myAssignments.assignments); // Update the assignments state with fetched data
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    fetchAssignments(); // Call fetchAssignments without the 'id' argument
  }

  useEffect(() => {
    getAssignments(); // Call getAssignments when the component mounts
  }, []);

  console.log(currentUser)

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
                <div key={index}>
                  <div>
                    <p className="border-2 border-black">
                      {assignment.description}
                      Grade: {grade ? grade.value : "Not graded"} {/* Display the grade value if it exists, otherwise show "Not graded" */}
                    </p>{" "}
                  </div>
                </div>
              );
            })
          ) : (
            <h1>Teacher</h1>
          )}
        </div>
      </div>
    </>
  );
}


export default Assignments;