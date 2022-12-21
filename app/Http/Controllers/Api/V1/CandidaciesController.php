<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\CandidacyStatus;
use App\Enums\VacancyStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\CandidacyCollection;
use App\Models\Vacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class CandidaciesController extends Controller
{
    public function index()
    {
        return new CandidacyCollection(auth()->user()->candidacies);
    }

    public function create(Vacancy $vacancy, Request $request)
    {
        /**@var $user User */
        $user = auth()->user();

        if($vacancy->status != VacancyStatus::OPEN->value) {
            throw ValidationException::withMessages(['A vaga não está mais disponível para candidaturas']);
        }

        if($user->candidacies()->where('vacancy_id', $vacancy->id)->exists()) {
            throw ValidationException::withMessages(['Você já se candidatou para essa vaga']);
        }

        $user->candidacies()->create([
            'vacancy_id' => $vacancy->id,
            'status' => CandidacyStatus::PENDING
        ]);

        return response()->json(null, JsonResponse::HTTP_CREATED);
    }

    public function destroy(Vacancy $vacancy, Request $request)
    {
        /**@var $user User */
        $user = auth()->user();

        $candidacy = $user->candidacies()->where('vacancy_id', $vacancy->id)->first();
        if($candidacy) {
            $candidacy->delete();
        }
        else {
            throw ValidationException::withMessages(['Não há candidaturas para a vaga selecionada']);
        }

        return response()->json(null, JsonResponse::HTTP_OK);
    }
}
