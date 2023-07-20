import React from "react";

function LeftTray({ currentUser, setIsLoggedIn, setCurrentUser }) {
  function handleLogOut(e) {
    fetch("/api/logout", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((r) => {
      if (r.ok) {
        setIsLoggedIn(false);
        // window.location.reload();
        // setCurrentUser(null);
      }
    });
  }

  return (
    <div className="flex flex-col fixed left-20 items-center w-60 pt-8 h-2/3 text-gray-700 bg-neutral-300 m-0">
      <div>
        <a className="flex items-center justify-center w-18 h-18 m-2 bg-white rounded-full">
          <svg
            className="w-10 h-10 stroke-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </a>
      </div>
      <div className="text-xl border-b-2 border-black">{currentUser.name}</div>
      <div className="text-xl border-b-2 border-black">{currentUser.role}</div>
      <div
        onClick={handleLogOut}
        className="border-black rounded border-2 mt-4"
      >
        Logout
      </div>
    </div>
  );
}

function showLeftTray() {
  const leftTrayContainer = document.createElement("div");
  leftTrayContainer.id = "left-tray-container"; // Optional: add an ID for further styling or manipulation
  document.body.appendChild(leftTrayContainer);

  // Render the LeftTray component inside the leftTrayContainer
  ReactDOM.render(<LeftTray />, leftTrayContainer);
}

export default LeftTray;
