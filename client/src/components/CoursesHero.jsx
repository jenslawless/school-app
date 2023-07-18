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
  console.log(courses)

  return (
    <>
      <div class="grid grid-cols-2">
        <div class="pl-24 pt-8">Course1</div>
        <div class="grid grid-cols-2">
          {courses.map((course) => (
            <div key={course.id} className="pl-24 pt-8">
              <h1>{course.name}</h1></div>
          ))}
        </div>
        <div class="pl-24 pt-8">Course2</div>
        <div class="pl-24 pt-8">Course3</div>
        <div class="pl-24 pt-8 grid">Course4</div>
      </div>
    </>
  );
}

export default CoursesHero;





























