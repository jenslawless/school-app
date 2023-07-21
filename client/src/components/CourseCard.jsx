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
        navigate(`/courses/${id}`);
      } catch (error) {
        console.error("Error fetching individual course:", error);
      }
    };
    fetchIndCourses(id);
  }

  function calculateAverageGrade(course) {

    if (currentUser.role === "Student" && currentUser.grades) {
      console.log("currentUser.grades:", currentUser.grades);
      const gradesForCourse = currentUser.grades.filter(
        (grade) => grade.assignment.course_id === course.id
      );
      console.log("gradesForCourse:", gradesForCourse);
      if (gradesForCourse.length > 0) {
        const sumGrades = gradesForCourse.reduce(
          (total, grade) => total + grade.value,
          0
        );
        const averageGrade = sumGrades / gradesForCourse.length;
        return averageGrade.toFixed(2);
      }
    }
    return "N/A";
  }

  return (
    <>
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-2">
          {currentUser.role === "Student"
            ? // Content for student
            currentUser.course_list.map((course) => (
              <div
                key={course.id}
                onClick={() => getIndCourses(course.id)}
                className="pl-24 pt-8 cursor-pointer "
              >
                <div className="w-auto">
                  <p className="border-2 border-black bg-cyan-800 text-white font-bold">
                    {course.name} - Overall Grade: {calculateAverageGrade(course)}%
                  </p>
                  <p className="border-2 border-black bg-neutral-300 italic">
                    Professor: {course.teacher.name}
                  </p>
                  <p className="border-2 border-black bg-neutral-300">
                    Course Description: {course.description}
                  </p>
                </div>
              </div>
            ))
            : // Content for teacher
            currentUser.courses.map((course) => (
              <div
                key={course.id}
                onClick={() => getIndCourses(course.id)}
                className="pl-24 pt-8 cursor-pointer"
              >
                <div className="w-auto">
                  <p className="border-2 border-black bg-cyan-800 text-white font-bold">
                    {course.name}
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
