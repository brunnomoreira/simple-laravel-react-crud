<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\VacancyCollection;
use App\Models\Vacancy;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function vacancies()
    {
        return new VacancyCollection(Vacancy::actives()->search());
    }
}