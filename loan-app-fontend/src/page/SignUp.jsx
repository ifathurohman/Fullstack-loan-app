import { NavLink, useNavigate } from "react-router-dom";
import { Api } from "../utils/api";
import * as Yup from "yup";
import { useFormik } from "formik"; 

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../component/Footer";

const SignUp = () => {
  const navigate = useNavigate();

  const notifySignupSuccess = () =>
    toast.success("Signup Success", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => navigate(-1)
    });

  const notifyError = (errorMessage) =>
    toast.error(`${errorMessage}`, {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // Define Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
    terms: Yup.boolean().oneOf([true], "Accepting terms is required"),
  });

  // Use useFormik hook for form handling
  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      password: "",
      terms: false,
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await Api.postRequest("/api/users", values);

        if (response.statusCode === 201) {
          notifySignupSuccess();
        } else {
          const errorMessage =
            response.data.errors?.message?.[0] || "Unexpected error";

          if (response.statusCode === 400) {
            const responseObject = JSON.parse(response.data)
            setErrors({
              username: responseObject.errors.username?.[0],
            });
          } else {
            setErrors({
              username: response.data.errors?.username,
              name: response.data.errors?.name,
              password: response.data.errors?.password,
              terms: response.data.errors?.terms,
            });

            notifyError(errorMessage);
          }
        }
      } catch (error) {
        notifyError(`Error during signup: ${error}`);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div>
        <section className="bg-gray-100 dark:bg-custom-dark py-24">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[80vh] lg:py-0">
            <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-custom-dark dark:border-gray-600">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                  Create an account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  action="#"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Your Username
                    </label>
                    <input
                      type="username"
                      name="username"
                      id="username"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.touched.username &&
                        formik.errors.username &&
                        "border-red-500"
                        }`}
                      placeholder="lorem"
                      required=""
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                    {/* Display error message if exists */}
                    {formik.touched.username && formik.errors.username && (
                      <p className="text-sm text-red-500">
                        {formik.errors.username}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Your Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      id="name"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.touched.name &&
                        formik.errors.name &&
                        "border-red-500"
                        }`}
                      placeholder="lorem ipsum"
                      required=""
                      value={formik.values.name}
                      onChange={formik.handleChange}
                    />
                    {/* Display error message if exists */}
                    {formik.touched.name && formik.errors.name && (
                      <p className="text-sm text-red-500">
                        {formik.errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.touched.password &&
                        formik.errors.password &&
                        "border-red-500"
                        }`}
                      required=""
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    {/* Display error message if exists */}
                    {formik.touched.password && formik.errors.password && (
                      <p className="text-sm text-red-500">
                        {formik.errors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        aria-describedby="terms"
                        type="checkbox"
                        className={`w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 ${formik.touched.terms &&
                          formik.errors.terms &&
                          "border-red-500"
                          }`}
                        checked={formik.values.terms}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-light text-gray-500 dark:text-black"
                      >
                        I accept the{" "}
                        <a
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                          href="#"
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>
                  {/* Display error message if exists */}
                  {formik.touched.terms && formik.errors.terms && (
                    <p className="text-sm text-red-500">
                      {formik.errors.terms}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full text-black bg-custom-green hover:bg-custom-dark-green focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Create an account
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account?{" "}
                    <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      <NavLink to="/login">Sign in</NavLink>
                    </button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default SignUp;
