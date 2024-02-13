<?php

namespace Database\Seeders;

use App\Models\Loan;
use App\Models\User;
use App\Services\LoanService;
use App\Repositories\LoanRepository;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RepaymentSeeder extends Seeder
{
    protected $loanService;
    protected $loanRepository;

    public function __construct(LoanService $loanService, LoanRepository $loanRepository)
    {
        $this->loanService = $loanService;
        $this->loanRepository = $loanRepository;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user  = User::where('username', 'test')->first();
        $admin = User::where('username', 'admin')->first();
        $date  = Carbon::now()->format('Y-m-d');
        $loan  = Loan::create([
            'amount' => '5000',
            'term' => '5',
            'due_date' => Carbon::parse($date),
            'user_id' => $user->id
        ]);

        $loan->generateRepayments();

        $loan = $this->loanRepository->getLoanById($loan->id);

        $loan->update(['state' => 'APPROVE']);

        // Assuming the third argument indicates whether the loan approval was successful
        $success = true; // Adjust based on your application's logic

        $this->loanService->createLoanApprovalHistory($loan, $admin->id, $success);
    }
}
