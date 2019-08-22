import React, { useState, useEffect } from "react";
import { withFormik, Form, Field} from "formik";
import * as Yup from "yup";
import axios from "axios";

function OnboardForm ({ errors, touched, values, status, isSubmitting}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
        }
    }, [status]);

    return (
        <div>
        <h3>I am the form you have been looking for.</h3>
        <Form>
            <Field type="text" name="name" placeholder="name"/>
            {touched.name && errors.name && (<p>{errors.name}</p>)}
            <Field type="email" name="email" placeholder="email"/>
            {touched.email && errors.email && (<p>{errors.email}</p>)}
            <Field type="password" name="password" placeholder="password"/>
            {touched.password && errors.password &&(<p>{errors.password}</p>)}
            <label> I agree to the terms of service.
                <Field type="checkbox" name="terms" checked={values.terms} />
                {touched.terms && errors.terms && (<p>{errors.terms}</p>)}
            </label>
            <button type="submit" disabled={isSubmitting}>Submit here.</button>


        </Form>
        {users.map(user => (
            <div>
                <h3>{user.name}</h3>
                <h4>{user.email}</h4>
                <p>{user.password}</p>
                <p>{user.name} is a good person. Be like {user.name}.</p>
            </div>
        ))}


        </div>
        
    )
}

const FormikOnboardForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("You call that an answer????"),
        email: Yup.string().required("Come on. We gotta contact you!!!"),
        password: Yup.string().required("Keep it secret. Keep it safe"),
        terms: Yup.boolean(true).required("You gotta be nice. Check the thing")
    }),

    handleSubmit(values, { setStatus, resetForm} ) {
        axios
            .post("https://reqres.in/api/users/", values)
            .then(res => {
                console.log(res.data);
                setStatus(res.data);
                resetForm();
            });
    }
})(OnboardForm);

export default FormikOnboardForm;