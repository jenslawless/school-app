import React from "react";
import ErrorContent from "../components/ErrorContent";

function ErrorPage({ currentUser }) {
  return <ErrorContent currentUser={currentUser} />;
}

export default ErrorPage;
