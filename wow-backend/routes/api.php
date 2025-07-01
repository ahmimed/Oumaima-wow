<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AnecdoteController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {
    Route::post('anecdotes', [AnecdoteController::class, 'store']);
    Route::delete('anecdotes/{id}', [AnecdoteController::class, 'destroy']);
    Route::post('anecdotes/{id}/vote', [VoteController::class, 'store']);
    Route::delete('anecdotes/{id}/vote', [VoteController::class, 'destroy']);
    Route::get('user/me', [UserController::class, 'me']);
    Route::get('users', [UserController::class, 'index'])->middleware('is_admin');
});
Route::get('anecdotes', [AnecdoteController::class, 'index']);
Route::get('anecdotes/{id}', [AnecdoteController::class, 'show']);