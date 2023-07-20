import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Menu({ currentUser, currentName }) {
  const [displayCourse, setDisplayCourse] = useState();
  const location = useLocation();
  function currentCourse() {}
  const navigate = useNavigate();

  const getCurrentComponent = () => {
    const component = location.pathname.split("/")[1];
    return component.charAt(0).toUpperCase() + component.slice(1);
  };

  return currentName ? (
    <>
      <div className="pl-24 pt-8 flex flex-row cursor-pointer">
        <div>
          <p>
            <img
              className="h-10 w-10"
              src="https://www.svgrepo.com/show/511004/hamburger-md.svg"
            />{" "}
            <button onClick={() => navigate("/courses")}>
              {getCurrentComponent()}
            </button>
            {"   "}
            {">"}
            {"   "}
            {currentName}
          </p>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="pl-24 pt-8 flex flex-row cursor-pointer">
        <div>
          <p>
            <img
              className="h-10 w-10"
              src="https://www.svgrepo.com/show/511004/hamburger-md.svg"
              // onClick={}
            />{" "}
            <button onClick={() => navigate("/courses")}>
              {getCurrentComponent()}
            </button>
            {"   "}
          </p>
        </div>
      </div>
    </>
  );
}

export default Menu;
