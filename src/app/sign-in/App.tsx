"use client";

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import Spinner from '../_components/Spinner';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const router = useRouter();

  const validationSchema = Yup.object({
    identifier: Yup.string()
      .required('Email or Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const initialValues = {
    identifier: '',
    password: '',
  };

  const handleSubmit = async (values: typeof initialValues , { resetForm }: any) => {
    try {
      const response = await axios.post('/api/auth/signin',values);
      if(response.data.success) {
        toast.success(response.data.message);
        resetForm();
        router.push('/user')
        router.refresh();
      } else {
        toast.error(response.data.message);
      }
    } catch (error:any) {
      toast.error(
        "An error occurred while creating the account. Please try again."
      );
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
                Email or Username
              </label>
              <Field
                type="text"
                id="identifier"
                name="identifier"
                className="input"
              />
              <ErrorMessage
                name="identifier"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold">
                Password
              </label>
              <div className="relative">
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="input"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 text-sm !text-black"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white p-2 rounded-md "
            >
              {isSubmitting ? <Spinner/> : 'Sign In'}
            </button>
          </Form>
        )}
      </Formik>
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <a href="/sign-up" className="text-blue-600">
          Sign up here
        </a>
      </p>
    </div>
  );
};

export default SignIn;
