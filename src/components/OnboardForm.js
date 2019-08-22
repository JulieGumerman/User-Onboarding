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
        <div className="just-the-background">
        <div className="form-container">
        <Form>
            <Field 
                className="form-field" 
                type="text" name="name" 
                placeholder="name"
            />
            {touched.name && errors.name && (
                <p className="error">{errors.name}</p>
            )}
            <Field 
                className="form-field" 
                type="email" name="email" 
                placeholder="email"
            />
            {touched.email && errors.email && (
                <p className="error">{errors.email}</p>
            )}
            <Field 
                className="form-field" 
                type="password" 
                name="password" 
                placeholder="password"
            />
            {touched.password && errors.password &&(
                <p className="error">{errors.password}</p>
            )}
            <Field 
                className="form-field"
                type="text"
                name="hometown"
                placeholder="hometown"
            />
            {touched.hometown && errors.hometown && (
                <p className="error">{errors.hometown}</p>
            )} 
            <Field 
                className="form-field" 
                component="select" 
                name="activity">
                    <option>Choose an activity</option>
                    <option>Hiking</option>
                    <option>Mountain Biking</option>
                    <option>Gallery-Hopping</option>
                    <option>Climbing</option>
                    <option>Pub-Crawling</option>
            </Field>
            {touched.activity && errors.activity && (
                <p className="error">{errors.activity}</p>
            )}
            <Field 
                className="text-area" 
                component="textarea" 
                name="favorite" 
                placeholder="The best thing about Colorado Springs is..."
            />
            {touched.favorite && errors.favorite && (
                <p className="error">{errors.favorite}</p>
            )}
            <label className="terms"> I agree to the terms of service.
                <Field 
                    type="checkbox" 
                    name="terms" 
                    checked={values.terms} 
                />
                {touched.terms && errors.terms && (
                    <p>{errors.terms}</p>
                )}
            </label>
            <button type="submit" disabled={isSubmitting}>Submit here.</button>


        </Form>
        </div>
        <div className="card-container">
            {users.map(user => (
                <div className="card">
                    <h3>{user.name}</h3>
                    <h4>{user.email}</h4>
                    <h6>{user.activity}</h6>
                    <p>{user.hometown}</p>
                    <p>{user.favorite}</p>
                </div>
            ))}
        </div>


        </div>
        
    )
}

const FormikOnboardForm = withFormik({
    mapPropsToValues({ name, email, password, hometown, activity, favorite, terms }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            hometown: hometown || "",
           activity: activity || "Choose an activity",
           favorite: favorite || "The best thing about Colorado Springs is...",
            terms: terms || false,
 
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("You call that an answer????"),
        email: Yup.string().required("Come on. We gotta contact you!!!"),
        password: Yup.string().required("Keep it secret. Keep it safe"),
        hometown: Yup.string().required("Tell us!"),
        activity: Yup.string().required("We know it's hard to choose just one!!!"),
        favorite: Yup.string().required("Go for it!!! Tell us!!!"),
        terms: Yup.boolean().oneOf([true], "You gotta be nice. Check the thing"),
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