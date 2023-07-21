import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function StudentInfo({ setCurrentNewName }) {
    const location = useLocation();
    const studentInfo = location.state?.studentInfo || null;
    const currentCourse = location.state?.currentCourse || null;
    const currentUser = location.state?.currentUser || null;
    useEffect(() => {
        setCurrentNewName(currentCourse.name);
    }, []);

    const [updatedStudentInfo, setUpdatedStudentInfo] = useState(studentInfo);

    const validationSchema = Yup.object().shape({
        grade: Yup.number().required('Grade is required').min(0, 'Grade must be at least 0').max(100, 'Grade cannot exceed 100'),
    });



    function updateGrade(studentId, assignmentId, newGrade) {
        const url = `/api/students/${studentId}/grades/${assignmentId}`;
        const data = { value: newGrade };

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((r) => {
                if (!r.ok) {
                    throw new Error('Failed to update grade.');
                }
                return r.json();
            })
            .then((updatedGrade) => {
                const updatedStudentInfoCopy = {
                    ...updatedStudentInfo,
                    grades: updatedStudentInfo.grades.map((g) =>
                        g.assignment_id === assignmentId ? { ...g, value: newGrade } : g
                    ),
                };
                setUpdatedStudentInfo(updatedStudentInfoCopy);
                console.log('Grade updated successfully:', updatedGrade);
                window.location.reload();
            })
            .catch((error) => {
                console.error('Error updating grade:', error);
            });
    }

    return (
        <>
            <div className="pl-24 pt-8">Student Name: {updatedStudentInfo.name}</div>
            <div className="pl-24 pt-8">Course Name: {currentCourse.name}</div>
            <div className="pl-24 pt-8">
                Assignments:{" "}
                {currentCourse.assignments.map((ass) => {
                    const grade = updatedStudentInfo.grades.find(
                        (g) => g.assignment_id === ass.id
                    );
                    return (
                        <div key={ass.id}>
                            <p>
                                {ass.description}: {grade.value}%
                            </p>

                            {currentUser.role === 'Teacher' && (
                                <Formik
                                    initialValues={{ grade: grade.value }} // Set the initial value of the grade field
                                    validationSchema={validationSchema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        updateGrade(updatedStudentInfo.id, ass.id, values.grade);
                                        setSubmitting(false);
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div>
                                                <label htmlFor={`grade-${ass.id}`}>Edit Grade:  </label>
                                                <Field type="number" id={`grade-${ass.id}`} name="grade" />
                                                <ErrorMessage name="grade" component="div" className="error" />
                                            </div>
                                            <button type="submit" disabled={isSubmitting}>
                                                Save
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default StudentInfo;
