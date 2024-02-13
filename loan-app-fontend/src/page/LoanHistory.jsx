import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getLoans as listLoans } from "../redux/actions/loanActions";
import moment from "moment";
import Footer from "../component/Footer";

import Swal from "sweetalert2";
import useLogin from "../utils/hooks/UseLogin";

import { Api } from "../utils/api";
import { FormattedCurrency, DateTime } from "../utils/functions";

const LoanHistory = () => {
  const dispatch = useDispatch();
  const getLoans = useSelector((state) => state.getLoans);
  const { loans } = getLoans;
  const { loginInfo } = useLogin();
  const [visibleLoanIndex, setVisibleLoanIndex] = useState(null);

  const handleToggleLoanDetail = (index) => {
    setVisibleLoanIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleToggleRepayLoan = async (index, date_repay, repayment_amount) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: `Yes, repay it!`,
      });

      if (result.isConfirmed) {
        const response = await Api.postRequest(`/api/repay-loan/${index}`, {
          repayment_amount,
        });

        if (response.statusCode === 200) {
          await Swal.fire({
            title: `Repayment - ${date_repay}`,
            text: `Loan has been repaid.`,
            icon: 'success',
          });
          dispatch(listLoans());
        } else {
          await Swal.fire({
            title: `Repayment - ${date_repay}`,
            text: `No valid repayment found for the due date.`,
            icon: 'error',
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const statusLabels = {
    APPROVE: "APPROVE",
    REJECT: "REJECT",
    PENDING: "PENDING",
    PAID: "PAID",
  };

  const statusStyles = {
    APPROVE: "bg-green-100 text-green-800",
    PAID: "bg-green-300 text-green-900",
    PENDING: "bg-yellow-100 text-yellow-800",
    REJECT: "bg-red-100 text-red-800",
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    dispatch(listLoans());
  }, [dispatch]);

  console.log(loans);

  if (loans?.loan_details?.count < 1 || loginInfo?.isLogin === false) {
    return (
      <div>
        <div className=" h-[70vh] flex justify-center items-center text-4xl ">
          Loan History Is Empty
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="mx-auto pt-20">
      <div>
        <div className="w-full bg-gray-100">
          <main className="w-full mx-auto py-8 px-4 sm:px-6 lg:pb-24 lg:px-[8rem]">
            <div className="flex flex-wrap -m-12">
              <div className="p-12 md:w-1/2 flex flex-col items-start">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                  Loan history
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Check the status of recent orders, manage returns, and download
                  invoices.
                </p>
                <span className="inline-block py-2 px-2 rounded bg-indigo-50 text-green-500 text-lg font-medium tracking-widest">
                  <h1>
                    Total Saldo :
                    <FormattedCurrency
                      locales="en-US"
                      number={`${loans?.total_amount_approved ?? 0}`}
                      options={{ padRight: true, showFraction: true }}
                    />
                  </h1>
                </span>
              </div>
              <div className="p-12 md:w-1/2 flex flex-col items-start text-end">
                <DateTime />
              </div>
            </div>

            <section aria-labelledby="recent-heading">
              <h2 id="recent-heading" className="sr-only">
                Recent orders
              </h2>
              {loans?.loan_details?.map((loans, key) => {
                return (
                  <div key={key} className="space-y-20 pt-8">
                    <div className="px-10 py-10 shadow-lg bg-white">
                      <div
                        className={`bg-${loans.loan_details.state === "APPROVE"
                          ? "green"
                          : loans.loan_details.state === "REJECT"
                            ? "red"
                            : loans.loan_details.state === "PENDING"
                              ? "yellow"
                              : "blue"
                          }-50 p-8 rounded-t-lg sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8`}
                      >
                        <dl className="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-1/2 lg:flex-none lg:gap-x-8">
                          <div className="flex justify-between sm:block">
                            <div className="font-medium text-gray-900">
                              Date of submission
                            </div>
                            <div className="sm:mt-1">
                              {moment(loans?.loan_details?.created_at).format(
                                "LLLL"
                              )}
                            </div>
                          </div>
                          <div className="flex justify-between pt-6 sm:block sm:pt-0">
                            <div className="font-medium text-gray-900">
                              Total loan amount
                            </div>
                            <dd className="sm:mt-1">
                              <FormattedCurrency
                                locales="en-US"
                                number={`${loans?.loan_details?.amount}`}
                                options={{ padRight: true, showFraction: true }}
                              />
                            </dd>
                          </div>
                          <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                            <div>Term</div>
                            <dd className="sm:mt-1">
                              {loans?.loan_details?.term}
                            </dd>
                          </div>
                        </dl>
                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                          <div className="font-bold text-gray-900 text-center">
                            <span
                              className={
                                loans?.loan_details?.state === "APPROVE"
                                  ? "text-green-500"
                                  : loans?.loan_details?.state === "REJECT"
                                    ? "text-red-500"
                                    : loans?.loan_details?.state === "PAID"
                                      ? "text-blue-500"
                                      : "text-yellow-500"
                              }
                            >
                              {statusLabels[loans?.loan_details?.state]}
                            </span>
                            <dd className="sm:mt-2">
                              {loans?.loan_details?.state === "APPROVE" || loans?.loan_details?.state === "PAID" ? (
                                <button
                                  onClick={() => handleToggleLoanDetail(key)}
                                  style={{ cursor: "pointer" }}
                                  className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                                >
                                  View Detail
                                </button>
                              ) : (
                                <button
                                  className="w-full flex items-center justify-center bg-gray-50 mt-6 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0 disabled:opacity-25"
                                  disabled
                                >
                                  View Detail
                                </button>
                              )}
                            </dd>
                          </div>
                        </div>
                      </div>

                      {visibleLoanIndex === key && (
                        <div
                          className={`bg-${loans.loan_details.state === "APPROVE"
                            ? "green"
                            : "orange"
                            }-50 px-8 rounded-b-lg`}
                        >
                          <table className="w-full text-gray-500">
                            <caption className="sr-only">Products</caption>
                            <thead className="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                              <tr>
                                <th
                                  scope="col"
                                  className="sm:w-2/5 lg:w-1/3 pr-8 py-3 font-normal"
                                >
                                  Scheduled Repayments
                                </th>
                                <th
                                  scope="col"
                                  className="hidden w-1/5 pr-8 py-3 font-normal sm:table-cell"
                                >
                                  Amount
                                </th>
                                <th
                                  scope="col"
                                  className="hidden pr-8 py-3 font-normal sm:table-cell"
                                >
                                  State
                                </th>
                                <th
                                  scope="col"
                                  className="w-0 py-3 font-normal text-right"
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            {loans?.loan_details?.repayments?.map(
                              (item, key) => {
                                return (
                                  <tbody
                                    key={key}
                                    className="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t"
                                  >
                                    <tr>
                                      <td className="py-6 pr-8">
                                        <div className="flex items-center">
                                          <div>
                                            <div className="font-medium text-gray-900">
                                              {moment(item?.due_date).format(
                                                "LL"
                                              )}
                                            </div>
                                            <div className="mt-1 sm:hidden">
                                              <FormattedCurrency
                                                locales="en-US"
                                                number={`${item?.amount}`}
                                                options={{ padRight: true, showFraction: true }}
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="hidden py-6 pr-8 sm:table-cell">
                                        <FormattedCurrency
                                          locales="en-US"
                                          number={`${item?.amount}`}
                                          options={{ padRight: true, showFraction: true }}
                                        />
                                      </td>
                                      <td className="hidden py-6 pr-8 sm:table-cell">

                                        <span
                                          className={classNames(
                                            statusStyles[item?.state],
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                                          )}
                                        >
                                          {item?.state}
                                        </span>
                                      </td>
                                      <td className="py-6 font-medium text-right whitespace-nowrap">
                                        {item?.state === "PENDING" ? (
                                          <button
                                            onClick={() => handleToggleRepayLoan(item?.loan_id, item?.due_date, item?.amount)}
                                            style={{ cursor: "pointer" }}
                                            className="w-full flex items-center justify-center bg-white mt-6 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0"
                                          >
                                            Repay
                                          </button>
                                        ) : (
                                          <button
                                            className={`w-full flex items-center justify-center mt-6 py-2 px-4 border rounded-md shadow-sm text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-auto sm:mt-0 disabled:opacity-25`}
                                            disabled
                                          >
                                            Repay
                                          </button>
                                        )}
                                      </td>
                                    </tr>
                                  </tbody>
                                );
                              }
                            )}
                          </table>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </section>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoanHistory;
