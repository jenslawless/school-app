import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CourseCard({ currentUser, setCurrentName }) {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const myCourses = await res.json();
        setCourses(myCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  function getIndCourses(id) {
    const fetchIndCourses = async (id) => {
      try {
        const res = await fetch(`/api/courses/${id}`);
        const myIndCourses = await res.json();
        // setCurrentName(myIndCourses.name);
        // Now navigate to the individual course page
        navigate(`/courses/${id}`);
      } catch (error) {
        console.error("Error fetching individual course:", error);
      }
    };
    fetchIndCourses(id);
  }

  return (
    <>
      <div className="grid grid-cols-2 ">
        <div className="grid grid-cols-2 ">
          {currentUser.course_list.map((course) => (
            <div
              key={course.id}
              onClick={() => getIndCourses(course.id)}
              className="pl-24 pt-8 cursor-pointer "
            >
              <div className="w-auto border-2 border-black rounded-md">
                <p className="border-2 border-black bg-sky-800 text-white font-bold">
                  {course.name}
                </p>
                <p className="border-2 border-black bg-neutral-300 italic">
                  Professor: {course.teacher.name}
                </p>
                <p className="border-2 border-black bg-neutral-300">
                  Course Description: {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CourseCard;
