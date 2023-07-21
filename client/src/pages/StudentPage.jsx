import React, { useState } from "react";
import StudentInfo from "../components/StudentInfo";
import Menu from "../components/Menu";

function StudentPage({ currentCourse, currentUser }) {
    const [currentNewName, setCurrentNewName] = useState("");

    return (
        <>
            <Menu
                currentUser={currentUser}
                currentName={currentNewName}
                toNavigate={"/courses"}
            />

            <StudentInfo
                currentCourse={currentCourse}
                setCurrentNewName={setCurrentNewName}
            />
        </>
    );
}

export default StudentPage;
