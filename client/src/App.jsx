import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
              setIsLoggedIn(true)
            })
        }
      })
  }, []);
  console.log(currentUser)

  return isLoggedIn ? (
    <BrowserRouter>
      <nav>
        <NavBar currentUser={currentUser} setIsLoggedIn={setIsLoggedIn} />
        <RightBar currentUser={currentUser} setIsLoggedIn={setIsLoggedIn} />
      </nav>
      <Routes>
        <Route
          path="/courses"
          element={<Courses currentUser={currentUser} />}
        />
        <Route
          path="course/:id"
          element={<Course currentUser={currentUser} />}
        />
        <Route
          path="calendar"
          element={<CalendarPage currentUser={currentUser} />}
        />
        <Route path="tasks" element={<Tasks currentUser={currentUser} />} />
        <Route
          path="messages"
          element={<Messages currentUser={currentUser} />}
        />
        <Route
          path="account/settings"
          element={<AccountSettings currentUser={currentUser} />}
        />
        <Route path="help" element={<Help currentUser={currentUser} />} />
        <Route path="*" element={<ErrorPage currentUser={currentUser} />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <LoginPage setIsLoggedIn={setIsLoggedIn} />
  );
}

export default App;
