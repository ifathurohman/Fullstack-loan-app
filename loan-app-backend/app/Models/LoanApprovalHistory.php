<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LoanApprovalHistory extends Model
{
    protected $fillable = ['loan_id', 'user_id', 'action'];

    public function loan()
    {
        return $this->belongsTo(Loan::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
