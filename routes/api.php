<?php

use App\Http\Controllers\Api\V1\Admin\CandidateController;
use App\Http\Controllers\Api\V1\Admin\VacancyController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CandidaciesController;
use App\Http\Controllers\Api\V1\HomeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::get('vacancies', [HomeController::class, 'vacancies']);

Route::prefix('auth')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('admin')->middleware(['role:admin'])->group(function () {
        Route::resource('vacancies', VacancyController::class)->except(['create', 'edit', 'destroy']);
        Route::resource('candidates', CandidateController::class)->except(['create', 'edit', 'destroy']);

        Route::post('vacancies/bulk-delete', [VacancyController::class, 'destroy']);
        Route::post('candidates/bulk-delete', [CandidateController::class, 'destroy']);      
    });

    Route::prefix('candidacies')->group(function () {
        Route::get('/', [CandidaciesController::class, 'index']);
        Route::post('/{vacancy}', [CandidaciesController::class, 'create']);
        Route::delete('/{vacancy}', [CandidaciesController::class, 'destroy']);
    });
});