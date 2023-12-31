import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import Menu from "./Menu";

function CoursesHero({ currentUser }) {

  return (
    <div>
      <Menu currentUser={currentUser} />
      <CourseCard currentUser={currentUser} />
    </div>
  );
}

export default CoursesHero;
