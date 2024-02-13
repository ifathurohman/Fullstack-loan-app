<?php

namespace App\Repositories;

use App\Models\Loan;

class LoanRepository
{
    public function submitLoanRequest(array $data)
    {
        return Loan::create($data);
    }
    public function getLoansWithRepaymentsByUserId($userId)
    {
        return Loan::with('repayments')
            ->where('user_id', $userId)
            ->get();
    }
    public function getAllLoansWithRepayments()
    {
        return Loan::with('repayments')->get();
    }
    public function getLoanById($loanId)
    {
        return Loan::with('repayments')->findOrFail($loanId);
    }

    public function getAllLoans()
    {
        return Loan::all();
    }
    public function getRepaymentByDueDate($loanId, $dueDate)
    {
        // $hardcodedDueDate = '2024-03-04'; // Replace with your desired date
        // return Loan::findOrFail($loanId)->repayments()->where('due_date', $hardcodedDueDate)->first();
        return Loan::findOrFail($loanId)->repayments()->where('due_date', $dueDate)->first();
    }
}
