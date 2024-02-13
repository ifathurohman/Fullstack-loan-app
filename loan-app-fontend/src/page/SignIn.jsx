import { NavLink, useNavigate } from "react-router-dom";
import { setToken } from "../utils/localstorage";
import { Api } from "../utils/api";

import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Footer from "../component/Footer";

const SignIn = () => {
  const navigate = useNavigate();

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

  const notifyLoginSuccess = () =>
    toast.success("Login Success", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      onClose: () => {
        navigate("/");
      },
    });

  // Define Yup validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      try {
        const response = await Api.postRequest("/api/users/login", values);
        const parsedResponse = JSON.parse(response.data);

        if (response.statusCode === 200) {
          setToken(parsedResponse.data.token);
          notifyLoginSuccess();
        } else {
          if (response.statusCode === 401) {
            const responseObject = JSON.parse(response.data);
            notifyError(responseObject.errors.message?.[0]);
          } else {
            setErrors({
              username: response.data.errors?.username,
              password: response.data.errors?.password,
            });
          }
        }
      } catch (error) {
        console.log(error);
        notifyError(`Error during login: ${error}`);
      }
    },
  });

  return (
    <>
      <ToastContainer />
      <div className="bg-gray-100 h-full py-24">
        <section className="dark:bg-custom-dark">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-[70vh] lg:py-0">
            <div className="w-full bg-white rounded-lg shadow-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-custom-dark dark:border-gray-600">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                  Login your account
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
                      Your username
                    </label>
                    <input
                      type="username"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
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
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-white dark:text-black"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                  <button
                    type="submit"
                    className="w-full text-black bg-custom-green hover:bg-custom-dark-green focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sign In
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Do you already have an account?{" "}
                    <button className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      <NavLink to="/signup">Sign up</NavLink>
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

export default SignIn;
