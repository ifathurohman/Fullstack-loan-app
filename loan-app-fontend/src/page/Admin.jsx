import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoans as listLoans } from "../redux/actions/loanActions";
import moment from "moment";
import { FormattedCurrency, handleApprove, handleReject } from "../utils/functions";


import Footer from "../component/Footer";

const Admin = () => {
  const dispatch = useDispatch();
  const getLoans = useSelector((state) => state.getLoans);
  const { loans } = getLoans;

  useEffect(() => {
    dispatch(listLoans());
  }, [dispatch]);

  console.log(loans);

  if (loans?.message === 'No loans found.') {
    return (
      <div>
        <div className=" h-[70vh] flex justify-center items-center text-4xl ">
          Loan History Is Empty
        </div>
        <Footer />
      </div>
    );
  }

  const cards = [
    {
      name: "Approve balance",
      href: "#",
      amount: loans?.total_amount_approved ?? 0,
    },
    {
      name: "Pending balance",
      href: "#",
      amount: loans?.total_amount_pending ?? 0,
    },
    {
      name: "Paid balance",
      href: "#",
      amount: loans?.total_amount_paid ?? 0,
    },
  ];

  const statusStyles = {
    APPROVE: "bg-green-100 text-green-800",
    PAID: "bg-green-300 text-green-900",
    PENDING: "bg-yellow-100 text-yellow-800",
    REJECT: "bg-red-100 text-red-800",
  };

  const handleApproveClick = async (loanId) => {
    await handleApprove(loanId);
    dispatch(listLoans());
  };

  const handleRejectClick = async (loanId) => {
    await handleReject(loanId);
    dispatch(listLoans());
  };


  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <div className="pt-20 bg-gray-100">
        <main className="flex-1 pb-8">
          <div className="mt-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Overview
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {/* Card */}
                {cards.map((card) => (
                  <div
                    key={card.name}
                    className="bg-white overflow-hidden shadow-lg rounded-lg"
                  >
                    <div className="p-5">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                            />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              {card.name}
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                <FormattedCurrency
                                  locales="en-US"
                                  number={`${card.amount}`}
                                  options={{ padRight: true, showFraction: true }}
                                />
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
              Recent activity
            </h2>

            {/* Activity list (smallest breakpoint only) */}
            <div className="shadow sm:hidden">
              <ul
                role="list"
                className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden"
              >
                {loans?.loan_details?.map((loans, key) => {
                  return (
                    <li key={key}>
                      <a
                        href="#"
                        className="block px-4 py-4 bg-white hover:bg-gray-50"
                      >
                        <span className="flex items-center space-x-4">
                          <span className="flex-1 flex space-x-2 truncate">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                              />
                            </svg>

                            <span className="flex flex-col text-gray-500 text-sm truncate">
                              <span className="truncate">
                                {loans.loan_details?.name}
                              </span>
                              <span>
                                <span className="text-gray-900 font-medium">
                                  {loans.loan_details?.amount}
                                </span>{" "}
                                {loans?.loan_details?.amount}
                              </span>
                              <time dateTime={loans?.loan_details?.created_at}>
                                {loans?.loan_details?.created_at}
                              </time>
                            </span>
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m8.25 4.5 7.5 7.5-7.5 7.5"
                            />
                          </svg>
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>

              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
                aria-label="Pagination"
              >
                <div className="flex-1 flex justify-between">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                  >
                    Previous
                  </a>
                  <a
                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
                  >
                    Next
                  </a>
                </div>
              </nav>
            </div>

            {/* Activity table (small breakpoint and up) */}
            <div className="hidden sm:block">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 shadow-lg bg-white">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-300 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Name
                          </th>
                          <th className="px-6 py-3 bg-gray-300 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 bg-gray-300 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Term
                          </th>
                          <th className="hidden px-6 py-3 bg-gray-300 text-center text-xs font-medium text-gray-600 uppercase tracking-wider md:block">
                            Status
                          </th>
                          <th className="px-6 py-3 bg-gray-300 text-center text-xs font-medium text-gray-600 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {loans?.loan_details?.map((loans, key) => {
                          console.log(loans?.loan_details?.id);
                          return (
                            <tr key={key} className="bg-white">
                              <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                <div className="flex">
                                  <a
                                    href=""
                                    className="group inline-flex space-x-2 truncate text-sm"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                                      />
                                    </svg>

                                    <p className="text-gray-500 truncate text-md group-hover:text-gray-900">
                                      {loans?.loan_details?.name} <br />
                                      <span className="text-xs text-gray-400">
                                        {moment(
                                          loans?.loan_details?.created_at
                                        ).format("lll")}
                                      </span>
                                    </p>
                                  </a>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                <span className="text-gray-900 font-medium">
                                  <FormattedCurrency
                                    locales="en-US"
                                    number={`${loans?.loan_details?.amount}`}
                                    options={{
                                      padRight: true,
                                      showFraction: true,
                                    }}
                                  />
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                {loans?.loan_details?.term}
                              </td>
                              <td className="hidden px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500 md:block">
                                <span
                                  className={classNames(
                                    statusStyles[loans?.loan_details?.state],
                                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                                  )}
                                >
                                  {loans?.loan_details?.state}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                <div className="inline-flex">
                                  {loans?.loan_details?.state === "PENDING" && (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleApproveClick(loans?.loan_details?.id)
                                        }
                                        className="bg-green-300 hover:bg-green-400 text-gray-800 font-bold py-2 px-4 rounded-l"
                                      >
                                        Approve
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleRejectClick(loans?.loan_details?.id)
                                        }
                                        className="bg-red-300 hover:bg-red-400 text-gray-800 font-bold py-2 px-4 rounded-r"
                                      >
                                        Reject
                                      </button>
                                    </>
                                  )}
                                  {loans?.loan_details?.state === "APPROVE" && (
                                    <button
                                      className="bg-green-100 text-gray-800 font-bold py-2 px-4 rounded"
                                      disabled
                                    >
                                      Approved
                                    </button>
                                  )}
                                  {loans?.loan_details?.state === "REJECT" && (
                                    <button
                                      className="bg-red-100 text-gray-800 font-bold py-2 px-4 rounded"
                                      disabled
                                    >
                                      Rejected
                                    </button>
                                  )}
                                  {loans?.loan_details?.state === "PAID" && (
                                    <button
                                      className="bg-white  text-gray-900 font-bold py-2 px-4 rounded"
                                      disabled
                                    >
                                      Completed
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
