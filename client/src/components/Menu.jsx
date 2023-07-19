import React, { useState } from "react";

function Menu() {
  const [displayCourse, setDisplayCourse] = useState();

  function currentCourse() {}

  return (
    <>
      <div className="pl-24 pt-8 grid-cols-1 cursor-pointer">
        <img
          className="h-10 w-10"
          src="https://www.svgrepo.com/show/511004/hamburger-md.svg"
          // onClick=""
        />
      </div>
    </>
  );
}

export default Menu;
