<?php

namespace App\Http\Controllers\Api\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\DeleteVacancyRequest;
use App\Http\Requests\StoreVacancyRequest;
use App\Http\Requests\UpdateVacancyRequest;
use App\Http\Resources\VacancyCollection;
use App\Http\Resources\VacancyResource;
use App\Models\Vacancy;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class VacancyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return new VacancyCollection(Vacancy::search());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVacancyRequest $request)
    {
        return new VacancyResource(Vacancy::create($request->validated()));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new VacancyResource(Vacancy::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateVacancyRequest $request, $id)
    {
        Vacancy::findOrFail($id)->update($request->validated());
        return response()->json(null, JsonResponse::HTTP_NO_CONTENT);
    }

    /**
     * Remove the specifieds resource from storage.
     *
     * @param  array  $ids
     * @return \Illuminate\Http\Response
     */
    public function destroy(DeleteVacancyRequest $request)
    {
        $data = $request->validated();
        Vacancy::destroy($data['vacancies']);
        return response()->json(null, JsonResponse::HTTP_NO_CONTENT);
    }
}
