<?php

namespace Database\Seeders;

use App\Models\Loan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class LoanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('username', 'test')->first();
        $date = Carbon::now()->format('Y-m-d');
        $loan = Loan::create([
            'amount' => '10000',
            'term' => '5',
            'due_date' => Carbon::parse($date),
            'user_id' => $user->id
        ]);

        $loan->generateRepayments();
    }
}
