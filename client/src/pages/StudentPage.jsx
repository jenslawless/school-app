import React from "react";
import StudentInfo from "../components/StudentInfo";
import Menu from "../components/Menu";

function StudentPage({ currentCourse }) {
    return (
        <>
            <Menu />
            <StudentInfo currentCourse={currentCourse} />
        </>
    );
}

export default StudentPage;