"use client";

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

const Signup = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Full Name is required'),
    username: Yup.string()
      .min(3, 'Username must be at least 3 characters')
      .required('Username is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });


  const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues, { resetForm }: any) => {
    try {
      console.log('Form values:', values);
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', values);
      toast.success('Account created successfully!');
      resetForm();
    } catch (error) {
      console.error('Error creating account:', error);
      toast.error('An error occurred while creating the account. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold">
                Full Name
              </label>
              <Field
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-semibold">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white p-2 rounded-md disabled:bg-gray-400"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>

      <p className="text-center mt-4">
        Already have an account?{' '}
        <a href="/sign-in" className="text-blue-600">
          Login here
        </a>
      </p>
    </div>
  );
};

export default Signup;
