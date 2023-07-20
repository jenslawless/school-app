import React from "react";

function AccountSettings({ currentUser }) {
  return (
    <>
      <div className="pl-24 pt-8">
        {currentUser.name}
        <button className="pl-24 pt-8">Edit</button>
      </div>
      <div className="pl-24 pt-8">{currentUser.email}</div>
      <div className="pl-24 pt-8">{currentUser.role}</div>
    </>
  );
}

export default AccountSettings;
