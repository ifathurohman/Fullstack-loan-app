<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User;

class LoanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'term' => $this->term,
            'user_id' => $this->user_id,
            'name' => $this->user->name,
            'due_date' => $this->due_date instanceof \Carbon\Carbon
                ? $this->due_date->toDateString()
                : $this->due_date,
            'state' => $this->state,
            'created_at' => $this->created_at->toDateTimeString(),
            'updated_at' => $this->updated_at->toDateTimeString(),
            'repayments' => RepaymentResource::collection($this->whenLoaded('repayments')),
        ];
    }
}
