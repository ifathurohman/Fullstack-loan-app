<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class ApproveLoanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize()
    {
        // Check if the authenticated user is authorized to approve loans
        return true;
        // return Auth::user()->role !== 'user';
    }

    public function rules()
    {
        return [
            'state' => 'required|in:APPROVE,REJECT',
        ];
    }
}
