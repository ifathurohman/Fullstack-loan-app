<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Loan;
use App\Http\Requests\LoanRequest;
use App\Http\Requests\RepayRequest;
use App\Http\Requests\ApproveLoanRequest;
use App\Services\LoanService;
use App\Repositories\LoanRepository;
use App\Http\Resources\LoanResource;
use App\Http\Resources\LoanApprovalResource;

use Illuminate\Http\Exceptions\HttpResponseException;

class LoanController extends Controller
{
    protected $loanService;
    protected $loanRepository;

    public function __construct(LoanService $loanService, LoanRepository $loanRepository)
    {
        $this->loanService = $loanService;
        $this->loanRepository = $loanRepository;
    }

    public function submitLoanRequest(LoanRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $loan = $this->loanService->submitLoanRequest($data['amount'], $data['term'], $user);

        return new LoanResource($loan);
    }

    public function listLoans(Request $request, $loanId = null)
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            return $this->loanService->listAdminLoans($loanId);
        } else {
            return $this->loanService->listUserLoans($loanId, $user->id);
        }
    }

    public function repayLoan(RepayRequest $request, $loanId)
    {
        $user = Auth::user();
        $loan = Loan::findOrFail($loanId);
        $request->validated();

        // Check if the loan belongs to the authenticated user
        if ($loan->user_id !== $user->id) {
            return response()->json(['message' => 'You are not authorized to repay this loan.'], 403);
        }

        // Check if the loan has been approved by an admin
        if ($loan->state !== 'APPROVE') {
            return response()->json(['message' => 'Loan has not been approved by admin.'], 400);
        }

        // Use Carbon's today method for the due date
        $repayment = $this->loanRepository->getRepaymentByDueDate($loanId, now()->toDateString());

        // return $this->loanService->processRepayment($loan, $repaymentDueDate, $request->input('repayment_amount'));
        return $this->loanService->processRepayment($loan, $repayment, $request->input('repayment_amount'));
    }

    public function approveLoan(ApproveLoanRequest $request, $loanId)
    {
        $user = Auth::user();
        $loan = $this->loanRepository->getLoanById($loanId);

        if ($loan->state === 'APPROVE') {
            return response()->json(['message' => 'Loan is already approved.'], 400);
        }

        $newState = $request->input('state'); // Get the state from the request payload

        // Update the loan state dynamically
        $loan->update(['state' => $newState]);
        $this->loanService->createLoanApprovalHistory($loan, $user->id, $newState);

        // Prepare the response payload
        $responsePayload = new LoanApprovalResource($loan);

        return response()->json($responsePayload);
    }

    // Method for getting loan details based on user role
    public function getLoanDetails()
    {
        $user = Auth::user();

        if ($user->role === 'admin') {
            $loans = $this->loanRepository->getAllLoansWithRepayments();
            return $this->loanService->getAdminLoanDetails($loans);
        } else {
            $loans = $this->loanRepository->getLoansWithRepaymentsByUserId($user->id);
            return $this->loanService->getUserLoanDetails($loans);
        }
    }
}
