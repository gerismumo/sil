"use client";

import { IAlbum } from "@/(models)/Album";
import Spinner from "@/app/_components/Spinner";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

type Props = {
  albumList:IAlbum[];
}
const ImageForm:React.FC<Props> = ({albumList}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
 
  const initialValues = {
    album: "",
    images: [{ url: "", title: "" }],
  };

  const validationSchema = Yup.object({
    album: Yup.string().required("Select an album"),
    images: Yup.array().of(
      Yup.object({
        url: Yup.string().url("Invalid URL").required("Image URL is required"),
        title: Yup.string().required("Image title is required"),
      })
    ),
  });

  /* eslint-disable @typescript-eslint/no-explicit-any */

  const handleSubmit = async(values: typeof initialValues,  {resetForm }:any) => {
    const albumId = values.album;
    const formattedValues = values.images.map((image) => {
      const title = image.title;
      const imageUrl = image.url;
      return {
        title,
        imageUrl,
        albumId
      }
    })

    try {
      const response = await axios.post('/api/photo', formattedValues);
      if(response.data.success) {
        toast.success(response.data.message);
        resetForm();
        router.refresh();
      } else {
        toast.error(response.data.message);
      }
    }catch{
      toast.error("Network error")
    }

   
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary text-white px-4 py-[3px] rounded-md"
      >
        Add Photos
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsOpen(false)} 
        >
          <div
            className="bg-white dark:bg-light-dark rounded-lg shadow-lg max-w-lg w-full p-6 h-[500px] overflow-auto "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row justify-between items-center ">
                <h2 className="text-xl font-bold mb-4">Add Images to Album</h2>
                <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-black dark:text-white text-[30px] "
                >
                    <FontAwesomeIcon icon={faXmark}/>
                </button>
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, isSubmitting }) => (
                <Form className="space-y-4">
                  <div>
                    <label htmlFor="album" className="block text-sm">
                      Select Album
                    </label>
                    <Field as="select" id="album" name="album" className="input">
                      <option value="">Select an Album</option>
                      {albumList.map((album, index) => (
                        <option key={index} value={album._id}>
                          {album.title}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="album"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <FieldArray name="images">
                    {({ push, remove }) => (
                      <div>
                        {values.images.map((_, index) => (
                          <div key={index} className="space-y-2 mb-4">
                            <label className="block text-sm">Image URL</label>
                            <Field
                              type="text"
                              name={`images.${index}.url`}
                              className="input"
                              placeholder="Enter image URL"
                            />
                            <ErrorMessage
                              name={`images.${index}.url`}
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            <label className="block text-sm">Image Title</label>
                            <Field
                              type="text"
                              name={`images.${index}.title`}
                              className="input"
                              placeholder="Enter image title"
                            />
                            <ErrorMessage
                              name={`images.${index}.title`}
                              component="div"
                              className="text-red-500 text-sm"
                            />

                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="text-red-500 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ url: "", title: "" })}
                          className="text-blue-500 text-sm"
                        >
                          Add Another Image
                        </button>
                      </div>
                    )}
                  </FieldArray>

                  <div className="flex justify-between">
                    <button
                      type="submit"
                      className="bg-primary w-full text-white px-4 py-2 rounded-md"
                    >
                      {isSubmitting ? <Spinner/>: "Post"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageForm;
