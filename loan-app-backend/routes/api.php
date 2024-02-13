<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});

Route::post('/users', [\App\Http\Controllers\UserController::class, 'register']);
Route::post('/users/login', [\App\Http\Controllers\UserController::class, 'login']);

Route::middleware(\App\Http\Middleware\ApiAuthMiddleware::class)->group(function () {
    Route::get('/users/current', [\App\Http\Controllers\UserController::class, 'get']);
    Route::patch('/users/current', [\App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/users/logout', [\App\Http\Controllers\UserController::class, 'logout']);


    Route::post('/loans', [\App\Http\Controllers\LoanController::class, 'submitLoanRequest']);
    Route::get('/list-loans/{loanId?}', [\App\Http\Controllers\LoanController::class, 'listLoans']);
    Route::post('/repay-loan/{loanId}', [\App\Http\Controllers\LoanController::class, 'repayLoan']);

    Route::post('/loans/{loanId}/approve', [\App\Http\Controllers\LoanController::class, 'approveLoan']);
    Route::get('/loans/details', [\App\Http\Controllers\LoanController::class, 'getLoanDetails']);

});
