import React from "react";

function RightBar({ currentUser }) {
  return (
    <div>
      <div className="flex flex-col fixed right-0 items-center w-44 pt-8 h-full text-gray-700 bg-white-600 m-0 border-l-2 border-black">
        <img
          className="h-14 w-auto border-b-2 border-gray-500"
          src="./src/assets/mainlogo.png"
        />
        <p>{currentUser.name}</p>
      </div>
    </div>
  );
}

export default RightBar;
