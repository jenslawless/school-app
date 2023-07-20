import React from "react";
import Menu from "../components/Menu";

function Tasks({ currentName, currentUser }) {
  return (
    <>
      <Menu
        currentUser={currentUser}
        currentName={currentName}
        toNavigate={"/tasks"}
      />
      <div className="grid grid-cols-2 pl-24 pt-8">Tasks</div>
    </>
  );
}

export default Tasks;
