import React from "react";
import { useNavigate } from "react-router-dom";

function ErrorContent({ currentUser }) {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="pl-24 pt-8 text-red-600 text-6xl">404: ERROR</h1>
      <div className="pl-24 pt-8">Go back home?</div>
      <a
        className="pl-24 pt-8 text-blue-500"
        href="#"
        onClick={() => navigate("/courses")}
      >
        Home
      </a>
    </>
  );
}

export default ErrorContent;
