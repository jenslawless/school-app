import React from "react";
import CoursesHero from "../components/CoursesHero";
import Menu from "../components/Menu";

function Courses({ currentUser }) {
  return (
    <>
      <CoursesHero currentUser={currentUser} />
    </>
  );
}

export default Courses;
