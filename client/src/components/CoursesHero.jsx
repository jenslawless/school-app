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
  console.log(courses);

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
              <h1>{course.name}</h1>
>>>>>>> e2fce5bc76f47994f8ff58a455713e38500e09fa
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CoursesHero;
