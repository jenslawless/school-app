import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making API calls

function LoginModal() {
  // State and event listeners...
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Define the login function for making the API call
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(email, password);

      if (response.success) {
        console.log("Login successful!");
        closeModal();
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  const closeModal = () => {
    setEmail("");
    setPassword("");
    setError("");
    setShowLoginModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-2 py-1 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-2 py-1 border rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Login
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="ml-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
