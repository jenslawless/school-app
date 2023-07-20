import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Menu() {
  const [displayCourse, setDisplayCourse] = useState();
  const location = useLocation();
  function currentCourse() {}

  const getCurrentComponent = () => {
    const component = location.pathname.split("/")[1];
    return component.charAt(0).toUpperCase() + component.slice(1);
  };

  return (
    <>
      <div className="pl-24 pt-8 flex flex-row cursor-pointer">
        <div>
          <img
            className="h-10 w-10"
            src="https://www.svgrepo.com/show/511004/hamburger-md.svg"
          />
          {getCurrentComponent()}
        </div>
      </div>
    </>
  );
}

export default Menu;
