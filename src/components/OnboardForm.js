import React from "react";
import { withFormik, Form, Field} from "formik";

function OnboardForm () {
    return (
        <div>
        <h3>I am the form you have been looking for.</h3>
        <Form>
            <label>Name:</label>
            <Field type="text" name="name"/>
            <label>Email:</label>
            <Field type="email" name="password"/>
        </Form>
        </div>
        
    )
}

const FormikOnboardForm = withFormik({
    mapPropsToValues({ name, email }) {
        return {
            name: name || "",
            email: email || "",
        };
    }
})(OnboardForm);

export default FormikOnboardForm;