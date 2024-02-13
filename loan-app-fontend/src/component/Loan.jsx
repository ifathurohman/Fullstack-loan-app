import { Api } from "../utils/api";

import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from "react-redux";


const Loan = () => {

    const user = useSelector((state) => state.user);

    const notifySuccess = () =>
        toast.success("Loan Create Success", {
            position: 'bottom-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            onClose: () => formik.resetForm()
        });

    const notifyError = (message) =>
        toast.error(`${message}`, {
            position: 'bottom-center',
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            onClose: () => formik.resetForm()
        });

    const validationSchema = Yup.object({
        amount: Yup.string().required("Amount is required"),
        term: Yup.string().required("Term is required"),
        terms: Yup.boolean().oneOf([true], "Accepting terms is required"),
    });

    const formik = useFormik({
        initialValues: {
            amount: "",
            term: "",
            terms: false,
        },
        validationSchema,
        onSubmit: async (values, { setErrors }) => {
            try {
                if (user?.userInfo?.details?.data?.role === "user") {
                    const response = await Api.postRequest("/api/loans", values);
                    const parsedResponse = JSON.parse(response.data);

                    if (response.statusCode === 200) {
                        console.log(parsedResponse.data);
                        notifySuccess();
                    } else {
                        if (response.statusCode === 401) {
                            const responseObject = JSON.parse(response.data);
                            notifyError(responseObject.errors.message?.[0]);
                        } else {
                            setErrors({
                                amount: response.data.errors?.amount,
                                term: response.data.errors?.term,
                            });
                        }
                    }
                } else {
                    notifyError("Only user roles can use this !")
                }

            } catch (error) {
                console.log(error)
            }
        },
    });

    return (
        <div>
            <ToastContainer />
            <div className="lg:w-full md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
                    How much money do you need?
                </h2>
                <form
                    className="space-y-4 md:space-y-6"
                    action="#"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <label
                            htmlFor="amount"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Your Amount Needed
                        </label>
                        <input
                            type="amount"
                            name="amount"
                            id="amount"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.touched.amount &&
                                formik.errors.amount &&
                                "border-red-500"
                                }`}
                            placeholder="$5000"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                        />
                        {/* Display error message if exists */}
                        {formik.touched.amount && formik.errors.amount && (
                            <p className="text-sm text-red-500">
                                {formik.errors.amount}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor="term"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        >
                            Term
                        </label>
                        <input
                            type="number"
                            name="term"
                            id="term"
                            placeholder="Term Loan"
                            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${formik.touched.term &&
                                formik.errors.term &&
                                "border-red-500"
                                }`}
                            required=""
                            value={formik.values.term}
                            onChange={formik.handleChange}
                        />
                        {/* Display error message if exists */}
                        {formik.touched.term && formik.errors.term && (
                            <p className="text-sm text-red-500">
                                {formik.errors.term}
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
                        Create Loan
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Loan
