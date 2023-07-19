import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Assignments() {
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

  return (
    <>
      <div className="grid grid-cols-2 pl-24 pt-8">
        <div className="grid grid-cols-2">
          {assignments.map(
            (
              assignment,
              index // Use a different name for the map variable (e.g., 'assignment' instead of 'assignments')
            ) => (
              <div key={index}>
                <div>
                  <p className="border-2 border-black">
                    {assignment.description}
                  </p>{" "}
                  {/* Render the specific assignment property (e.g., assignment.title) */}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Assignments;
