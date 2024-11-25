"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignIn = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      console.log('Form values:', values);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="input rounded-md"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="input rounded-md"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white p-2 rounded-md disabled:bg-gray-400"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <a href="/sign-in" className="text-blue-600">
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default SignIn;
