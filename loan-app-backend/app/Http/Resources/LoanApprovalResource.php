<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoanApprovalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'loan_id' => $this->id,
            'user_id' => $this->user_id,
            'data'    => [
                "id"       => $this->id,
                "amount"   => $this->amount,
                "term"     => $this->term,
                "due_date" => $this->due_date,
                "state"    => $this->state
            ],
            'message' => "Loan state updated to {$this->state} successfully.",
        ];
    }
}
