import React from "react";
import LoginModal from "../components/LoginModal";

function LoginPage() {
  return (
    <>
      <div className="bg-white h-screen w-screen z-50 border-green-600 border-2 pl-24 pt-8">
        <LoginModal />
      </div>
    </>
  );
}

export default LoginPage;
