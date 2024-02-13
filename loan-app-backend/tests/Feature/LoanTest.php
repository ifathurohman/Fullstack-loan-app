<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Loan;
use Tests\TestCase;
use Database\Seeders\UserSeeder;
use Database\Seeders\LoanSeeder;
use Database\Seeders\RepaymentSeeder;
use Database\Seeders\LoanApprovalSeeder;
use Illuminate\Support\Facades\DB;

use Carbon\Carbon;

class LoanTest extends TestCase
{
    // use RefreshDatabase;
    public function testCreateLoanSuccess()
    {
        $this->seed([UserSeeder::class]);

        $this->post('/api/loans', [
            'amount' => 10000,
            'term' => 5,
        ], [
            'Authorization' => 'test'
        ])->assertStatus(200)
            ->assertJson([
                'data' => [
                    'amount' => '10000',
                    'term' => '5',
                    'due_date' => Carbon::today()->toDateString(),
                    'state' => 'PENDING',
                ]
            ]);
    }

    public function testCreateFailed()
    {
        $this->seed([UserSeeder::class]);

        $this->post('/api/loans', [
            'amount' => '',
            'term' => '',
        ], [
            'Authorization' => 'test'
        ])->assertStatus(400)
            ->assertJson([
                'errors' => [
                    "amount" => [
                        "The amount field is required."
                    ],
                    "term"  => [
                        "The term field is required."
                    ]
                ]
            ]);
    }

    public function testCreateUnauthorized()
    {
        $this->seed([UserSeeder::class]);

        $this->post('/api/loans', [
            'amount' => 10000,
            'term' => 5
        ], [
            'Authorization' => 'salah'
        ])->assertStatus(401)
            ->assertJson([
                'errors' => [
                    'message' => [
                        'unauthorized'
                    ]
                ]
            ]);
    }

    public function testGetSuccess()
    {
        $this->seed([UserSeeder::class, LoanSeeder::class]);
        $loan = Loan::query()->limit(1)->first();

        $this->get('/api/list-loans/' . $loan->id, [
            'Authorization' => 'test'
        ])->assertStatus(200)
            ->assertJson([
                'data' => [
                    'id' => $loan->id,
                    'amount' => '10000.00',
                    'term' => 5,
                    'due_date' => Carbon::today()->toDateString(),
                    'state' => 'PENDING',
                ]
            ]);
    }

    public function testGetDetailSuccess()
    {
        $this->seed([UserSeeder::class, LoanSeeder::class]);
        $loan = Loan::query()->limit(1)->first();

        $loanDetails = [
            'loan_id' => $loan->id,
            'loan_details' => [
                'id' => $loan->id,
                'amount' => $loan->amount,
                'term' => $loan->term,
                'user_id' => $loan->user_id,
                'name' => $loan->user->name, 
                'due_date' => Carbon::parse($loan->due_date)->format('Y-m-d'),
                'state' => $loan->state,
                'created_at' => Carbon::parse($loan->created_at)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::parse($loan->updated_at)->format('Y-m-d H:i:s'),
                'repayments' => [],
            ],
            'repayments' => [],
        ];

        foreach ($loan->repayments as $repayment) {
            $repaymentData = [
                'id' => $repayment->id,
                'loan_id' => $repayment->loan_id,
                'amount' => $repayment->amount,
                'due_date' => $repayment->due_date,
                'state' => $repayment->state,
            ];
            $loanDetails['loan_details']['repayments'][] = $repaymentData;
            $loanDetails['repayments'][] = $repaymentData;
        }

        $expectedJson = [
            'loan_details' => [$loanDetails]
        ];

        $this->get('/api/loans/details/', [
            'Authorization' => 'test'
        ])->assertStatus(200)
            ->assertJson($expectedJson);
    }

    public function testGetDetailSuccessAdmin()
    {
        $this->seed([UserSeeder::class, LoanSeeder::class]);
        $loan = Loan::query()->limit(1)->first();

        // Fetch loan status amounts
        $loanStatusAmounts = Loan::select(
            DB::raw('SUM(CASE WHEN state = "PENDING" THEN amount ELSE 0 END) as pending'),
            DB::raw('SUM(CASE WHEN state = "APPROVE" THEN amount ELSE 0 END) as approved'),
            DB::raw('SUM(CASE WHEN state = "PAID" THEN amount ELSE 0 END) as paid')
        )->first();

        // Construct loan details array
        $loanDetails = [
            'loan_id' => $loan->id,
            'loan_details' => [
                'id' => $loan->id,
                'amount' => $loan->amount,
                'term' => $loan->term,
                'user_id' => $loan->user_id,
                'name' => $loan->user->name ?? null,
                'due_date' => $loan->due_date,
                'state' => $loan->state,
                'created_at' => Carbon::parse($loan->created_at)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::parse($loan->updated_at)->format('Y-m-d H:i:s'),
                'repayments' => [],
            ],
            'approval_history' => [],
            'repayments' => [],
        ];

        foreach ($loan->repayments ?? [] as $repayment) {
            $repaymentData = [
                'id' => $repayment->id,
                'loan_id' => $repayment->loan_id,
                'amount' => $repayment->amount,
                'due_date' => $repayment->due_date,
                'state' => $repayment->state,
            ];
            $loanDetails['loan_details']['repayments'][] = $repaymentData;
            $loanDetails['repayments'][] = $repaymentData;
        }

        foreach ($loan->approvalHistory ?? [] as $approval) {
            $approvalData = [
                'id' => $approval->id,
                'loan_id' => $approval->loan_id,
                'user_id' => $approval->user_id,
                'action' => $approval->action,
                'created_at' => Carbon::parse($approval->created_at)->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::parse($approval->updated_at)->format('Y-m-d H:i:s'),
            ];
            $loanDetails['approval_history'][] = $approvalData;
        }

        $expectedJson = [
            'loan_details' => [$loanDetails],
            'total_amount_pending' => $loanStatusAmounts->pending ?? 0,
            'total_amount_approved' => $loanStatusAmounts->approved ?? 0,
            'total_amount_paid' => $loanStatusAmounts->paid ?? 0,
        ];

        $this->get('/api/loans/details', [
            'Authorization' => 'admin'
        ])->assertStatus(200)
            ->assertJson($expectedJson);
    }

    public function testApprovalLoanSuccess()
    {
        $this->seed([UserSeeder::class, LoanApprovalSeeder::class]);

        $loan = Loan::query()->limit(1)->first();

        $this->post('/api/loans/' . $loan->id . '/approve', ['state' => 'APPROVE',], [
            'Authorization' => 'admin',
        ])->assertStatus(200)
            ->assertJson([
                'loan_id' => $loan->id,
                'user_id' => $loan->user_id,
                'data' => [
                    'id' => $loan->id,
                    'amount' => $loan->amount,
                    'term' => $loan->term,
                    'due_date' => $loan->due_date,
                    'state' => 'APPROVE',
                ],
                "message" => "Loan state updated to APPROVE successfully.",
            ]);
    }

    public function testApprovalLoanUnauthorized()
    {
        $this->seed([UserSeeder::class, LoanSeeder::class]);

        $loan = Loan::query()->limit(1)->first();

        $this->post('/api/loans/' . $loan->id . '/approve', [], [
            'Authorization' => 'test',
        ])->assertStatus(403)
            ->assertJson([
                "message" => "Unauthorized to approve loans."
            ]);
    }

    public function testRepayLoanSuccess()
    {
        $this->seed([UserSeeder::class, RepaymentSeeder::class]);

        $endDate = Carbon::today()->addDays(7);

        $loan = Loan::query()->limit(1)->first();

        $repayments = $loan->repayments()->whereDate('due_date', $endDate)->first();

        $repayments->touch();

        $response = $this->post('/api/repay-loan/' . $loan->id, [
            'repayment_amount' => 1000,
        ], [
            'Authorization' => 'test',
        ]);

        $response->assertStatus(200);

        $response->assertJson([
            "loan_id" => $loan->id,
            "repayment" => [
                "id" => $repayments->id,
                "loan_id" => $loan->id,
                "amount" => $repayments->amount,
                "due_date" => $repayments->due_date,
                "state" => 'PAID',
                "created_at" => Carbon::parse($repayments->created_at)->format('Y-m-d H:i:m'),
                "updated_at" => now()->format('Y-m-d H:i:s'),
            ]
        ]);
    }
}
