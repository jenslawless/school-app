import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CourseCard({ currentUser }) {
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
        console.log(myIndCourses);
        // Now navigate to the individual course page
        navigate(`/course/${id}`);
      } catch (error) {
        console.error("Error fetching individual course:", error);
      }
    };
    fetchIndCourses(id);
  }

  return (
    <>
      <div className="grid grid-cols-2 ">
        <div className="grid grid-cols-2">
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => getIndCourses(course.id)}
              className="pl-24 pt-8 cursor-pointer"
            >
              <div className="w-auto">
                <p className="border-2 border-black bg-gray-500">
                  {course.name}
                </p>
                <p className="border-2 border-black bg-neutral-300">
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
