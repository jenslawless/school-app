import React from "react";
import StudentInfo from "../components/StudentInfo";
import Menu from "../components/Menu";

function StudentPage({ currentCourse, currentUser }) {
    return (
        <>
            <Menu />
            <StudentInfo currentCourse={currentCourse} currentUser={currentUser} />
        </>
    );
}

export default StudentPage;
