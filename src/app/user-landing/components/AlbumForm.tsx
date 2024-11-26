"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AlbumForm = () => {
    const [isOpen, setIsOpen] = useState(false);
  const initialValues = {
    albumName: "",
  };

  const validationSchema = Yup.object({
    albumName: Yup.string().required("Album name is required"),
  });

  const handleSubmit = (values: typeof initialValues) => {
    console.log("New Album Added:", values);
  };

  return (
    <div>
        <button
            onClick={() => setIsOpen(true)}
            className="bg-primary text-white px-4 py-[3px] rounded-md"
        >
            Add Album
      </button>
      {isOpen && (
        <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={() => setIsOpen(false)}>
            <div
            className="bg-white dark:bg-light-dark rounded-lg shadow-lg max-w-lg w-full p-6 h-[230px] overflow-auto "
            onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-row justify-between items-center ">
                    <div></div>
                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="text-white text-[30px] "
                    >
                        <FontAwesomeIcon icon={faXmark}/>
                    </button>
                </div>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                    <Form className="space-y-4">
                        <div>
                        <label htmlFor="albumName" className="block text-sm font-semibold">
                            Album Name
                        </label>
                        <Field type="text" id="albumName" name="albumName" className="input" />
                        <ErrorMessage
                            name="albumName"
                            component="div"
                            className="text-red-500 text-sm"
                        />
                        </div>
                        <button
                        type="submit"
                        className="w-full bg-primary text-white p-2 rounded-md"
                        >
                        Submit
                        </button>
                    </Form>
                    )}
                </Formik>
            </div>
        </div>
      )}
    </div>

  );
};

export default AlbumForm;
