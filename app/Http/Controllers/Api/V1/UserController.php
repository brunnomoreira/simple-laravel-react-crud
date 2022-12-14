<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\CandidacyCollection;
use App\Models\Vacancy;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function candidacies()
    {
        return new CandidacyCollection(auth()->user()->candidacies);
    }

    public function applyCandidacy(Vacancy $vacancy, Request $request)
    {
        
    }

    public function removeCandidacy(Vacancy $vacancy, Request $request)
    {
        
    }
}
