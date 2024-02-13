/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import Swal from "sweetalert2";
import { Api } from "../utils/api";
import { formatCurrency } from "@bitovi/react-numerics";
import moment from "moment";

const FormattedCurrency = ({ locales, number, options }) => (
  <span>{formatCurrency(locales, options)(number)}</span>
);

const handleAction = async (loanId, actionType, state) => {
  const actionText = actionType === 'approve' ? 'approved' : 'rejected';

  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Yes, ${actionType} it!`,
    });

    if (result.isConfirmed) {
      await Swal.fire({
        title: `${actionType === 'approve' ? 'Approved' : 'Rejected'}!`,
        text: `Loan has been ${actionText}.`,
        icon: 'success',
      });

      const response = await Api.postRequest(`/api/loans/${loanId}/approve`, {
        state,
      });

      console.log(response);
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
    } else {
      console.error('Error:', error.message);
    }
  }
};

const handleApprove = async (loanId, dispatch) => {
  await handleAction(loanId, 'approve', 'APPROVE', dispatch);
};

const handleReject = async (loanId, dispatch) => {
  await handleAction(loanId, 'reject', 'REJECT', dispatch);
};

const DateTime = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='w-full'>
      <h1 className="w-full text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
        {moment(date.toLocaleDateString()).format(
          "LL"
        )}
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        <p>{date.toLocaleTimeString()}</p>
      </p>
    </div>

  );
}


export { FormattedCurrency, handleApprove, handleReject, DateTime };
