<?php

namespace App\Http\Requests;

use App\Enums\VacancyStatus;
use App\Enums\VacancyType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreVacancyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required',
            'summary' => 'required',
            'description' => 'required',
            'type' => ['required', Rule::in(array_column(VacancyType::cases(), 'value'))],
            'status' => ['required', Rule::in(array_column(VacancyStatus::cases(), 'value'))],
        ];
    }
}
