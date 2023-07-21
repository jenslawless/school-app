import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role: Yup.string().required("Role is required"),
});

function AccountSettings({ currentUser }) {
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(
        `http://localhost:5555/api/users/${currentUser.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user data.");
      }

      // Handle success, e.g., show a success message to the user.
      console.log("User data updated successfully.");
    } catch (error) {
      // Handle errors, e.g., show an error message to the user.
      console.error("Error updating user data:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: currentUser.name,
        email: currentUser.email,
        role: currentUser.role,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="pl-24 pt-8">
            <label htmlFor="name">Name</label>
            <Field type="text" id="name" name="name" />
            <ErrorMessage name="name" component="div" className="error" />
          </div>

          <div className="pl-24 pt-8">
            <label htmlFor="email">Email</label>
            <Field type="email" id="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />
          </div>

          <div className="pl-24 pt-8">
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AccountSettings;
