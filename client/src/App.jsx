import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Tasks from "./pages/Tasks";
import Messages from "./pages/Messages";
import Help from "./pages/Help";
import Courses from "./pages/Courses";
import Calendar from "./pages/Calendar";
import AccountSettings from "./pages/AccountSettings";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <Router>
      <nav>
        <NavBar />
      </nav>
      <Routes>
        <Route exact path="/" element={<Courses />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/account/settings" element={<AccountSettings />} />
        <Route path="/help" element={<Help />} />
        <Route path="/*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
