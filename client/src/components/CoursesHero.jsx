import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Menu from "./Menu";

function CoursesHero() {
  return (
    <div>
      <Menu />
      <CourseCard />
    </div>
  );
}

export default CoursesHero;
