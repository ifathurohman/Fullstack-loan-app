<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Repayment extends Model
{
    use HasFactory;

    protected $fillable = ['loan_id', 'amount', 'due_date', 'state'];

    public function loan()
    {
        return $this->belongsToMany(Loan::class);
    }
    public function repayments()
    {
        return $this->hasMany(Repayment::class);
    }
    public function serializeDate(\DateTimeInterface $date)
    {
        return $date->format('Y-m-d H:i:s');
    }
}
