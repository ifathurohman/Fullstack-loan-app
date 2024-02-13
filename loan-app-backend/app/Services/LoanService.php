<?php

namespace App\Services;

use App\Models\Loan;
use App\Models\Repayment;
use App\Repositories\LoanRepository;
use App\Models\LoanApprovalHistory;
use App\Http\Resources\LoanResource;
use App\Http\Resources\RepaymentResource;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class LoanService
{
    protected $loanRepository;

    public function __construct(LoanRepository $loanRepository)
    {
        $this->loanRepository = $loanRepository;
    }

    public function submitLoanRequest($amount, $term, $user)
    {
        $user = Auth::user();
        $date = Carbon::now()->format('Y-m-d');
        $loan = Loan::create([
            'amount' => $amount,
            'term' => $term,
            'due_date' => Carbon::parse($date),
            'state' => 'PENDING',
            'user_id' => $user->id,
        ]);

        $loan->generateRepayments();

        return new LoanResource($loan);
    }

    public function listAdminLoans($loanId)
    {
        if ($loanId !== null) {
            $loan = Loan::with('repayments')->findOrFail($loanId);
            return new LoanResource($loan);
        } else {
            $loans = Loan::all();
            return LoanResource::collection($loans);
        }
    }

    public function listUserLoans($loanId, $userId)
    {
        if ($loanId !== null) {
            $loan = Loan::where('id', $loanId)
                ->where('user_id', $userId)
                ->with('repayments')
                ->firstOrFail();
            return new LoanResource($loan);
        } else {
            $userLoans = Loan::where('user_id', $userId)->get();
            return LoanResource::collection($userLoans);
        }
    }

    public function processRepayment(Loan $loan, $repaymentDueDate, $repaymentAmount)
    {
        $repayment = $this->loanRepository->getRepaymentByDueDate($loan->id, $repaymentDueDate);

        if ($repayment && $repayment->state === 'PENDING') {
            if ($repaymentAmount === $repayment->amount) {
                return $this->completeRepayment($loan, $repayment, $repaymentAmount);
            }
        } else {
            return response()->json(['message' => 'No valid repayment found for the due date.'], 400);
        }
    }

    private function completeRepayment(Loan $loan, Repayment $repayment)
    {
        $repayment->update(['state' => 'PAID']);
        $this->updateLoanState($loan);

        return response()->json([
            'loan_id' => $loan->id,
            'repayment' => $repayment,
        ]);
    }

    public function updateLoanState($loan)
    {
        $pendingRepaymentsCount = $loan->repayments()
            ->where('state', '=', 'PENDING')
            ->count();

        if ($pendingRepaymentsCount === 0) {
            $loan->update(['state' => 'PAID', 'updated_at' => Carbon::now()->format('Y-m-d H:i:m')]);
        }

        if ($loan->term === $pendingRepaymentsCount) {
            $loan->update(['state' => 'PAID']);
        }
    }

    public function createLoanApprovalHistory($loan, $userId, $state)
    {
        LoanApprovalHistory::create([
            'loan_id' => $loan->id,
            'user_id' => $userId,
            'action' => $state,
        ]);
    }

    public function getAdminLoanDetails($loans)
    {
        $loanStatusAmounts = Loan::select(
            DB::raw('SUM(CASE WHEN state = "PENDING" THEN amount ELSE 0 END) as pending'),
            DB::raw('SUM(CASE WHEN state = "APPROVE" THEN amount ELSE 0 END) as approved'),
            DB::raw('SUM(CASE WHEN state = "PAID" THEN amount ELSE 0 END) as paid')
        )->first();

        if ($loans->isEmpty()) {
            return response()->json(['message' => 'No loans found.'], 404);
        }

        $loanDetails = [];
        foreach ($loans as $loan) {
            $loanResource = LoanResource::make($loan)->toArray($loan);
            $loanDetails[] = [
                'loan_id' => $loan->id,
                'loan_details' => $loanResource,
                'approval_history' => LoanApprovalHistory::where('loan_id', $loan->id)->get(),
                'repayments' => RepaymentResource::collection($loan->repayments),
            ];
        }

        return response()->json([
            'loan_details' => $loanDetails,
            'total_amount_pending' => $loanStatusAmounts->pending,
            'total_amount_approved' => $loanStatusAmounts->approved,
            'total_amount_paid' => $loanStatusAmounts->paid,
        ]);
    }

    public function getUserLoanDetails($loans)
    {
        $loanStatusAmounts = Loan::select(
            DB::raw('SUM(CASE WHEN state = "APPROVE" THEN amount ELSE 0 END) as approved'),
        )->first();

        if ($loans->isEmpty()) {
            return response()->json(['message' => 'No loans found.'], 404);
        }

        $loanDetails = [];
        foreach ($loans as $loan) {
            $loanResource = LoanResource::make($loan)->toArray($loan);
            $loanDetails[] = [
                'loan_id' => $loan->id,
                'loan_details' => $loanResource,
                'repayments' => RepaymentResource::collection($loan->repayments),
            ];
        }

        return response()->json(['loan_details' => $loanDetails,  'total_amount_approved' => $loanStatusAmounts->approved]);
    }
}
