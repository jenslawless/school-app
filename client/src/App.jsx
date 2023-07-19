import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Tasks from "./pages/Tasks";
import Messages from "./pages/Messages";
import Help from "./pages/Help";
import Courses from "./pages/Courses";
import CalendarPage from "./pages/CalendarPage";
import AccountSettings from "./pages/AccountSettings";
import ErrorPage from "./pages/ErrorPage";
import RightBar from "./components/RightBar";
import Course from "./pages/Course";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("")



  useEffect(() => {
    fetch('/api/check_session')
      .then((r) => {
        if (r.ok) {
          r.json()
            .then((currentUser) => {
              setCurrentUser(currentUser)
            })
        }
      })
  }, []);

  // You can use a ternary operator to conditionally render content
  return isLoggedIn ? (
    <Router>
      <nav>
        <NavBar />
        <RightBar />
      </nav>
      <Routes>
        <Route exact path="/" element={<Courses />} />
        <Route path="/course/:id" element={<Course />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/account/settings" element={<AccountSettings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  ) : (
    <LoginPage setIsLoggedIn={setIsLoggedIn} />
  );
}

export default App;
