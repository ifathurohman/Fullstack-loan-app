<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Repayment;
use App\Http\Requests\RepayRequest;
use App\Http\Resources\RepaymentResource;
use Carbon\Carbon;

class RepaymentController extends Controller
{
    public function repayLoan(RepayRequest $request, $loanId)
    {
        $loan = Loan::findOrFail($loanId);

        // Check if today is the due date
        if (Carbon::today()->isSameDay($loan->due_date)) {
            // Validate the repayment request
            $request->validated();

            // Create a repayment record
            $repayment = Repayment::create([
                'loan_id' => $loan->id,
                'amount' => $request->input('repayment_amount'),
                'due_date' => Carbon::today(),
                'state' => 'PAID', // Assuming it's marked as paid immediately
            ]);

            // return new RepaymentResource($repayment);
            return (new RepaymentResource($repayment))->response()->setStatusCode(201);
        }

        return response()->json(['message' => 'Today is not the due date for this loan.'], 400);
    }
}
