import React, { useState, useEffect } from "react";

function CoursesHero() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch("/api/courses");
      const myCourses = await res.json();
      setCourses(myCourses);
    };

    fetchCourses().catch(console.error);
  }, []);
  // console.log(courses);

  return (
    <>
<<<<<<< HEAD
      <div class="grid grid-cols-2">
        <div class="grid grid-cols-2">
          {courses.map((course) => (
            <div key={course.id} className="pl-24 pt-8">
              <h1>{course.name}</h1>
              <h2>{course.description}</h2>
=======
      <div className="grid grid-cols-2">
        <div className="grid grid-cols-2">
          {courses.map((course) => (
            <div key={course.id} className="pl-24 pt-8">
              <div>
                <p className="border-2 border-black">{course.name}</p>

                <p className="border-2 border-black">{course.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CoursesHero;
