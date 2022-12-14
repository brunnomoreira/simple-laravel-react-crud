<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VacancyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        if ($this->getMethod() == 'POST') 
        {
            return [
                'name' => 'required',
                'summary' => 'required',
                'description' => 'required',
                'type' => ['required', Rule::in(array_column(VacancyType::cases(), 'value'))],
                'status' => ['required', Rule::in(array_column(VacancyStatus::cases(), 'value'))],
            ];
        }
        else {
            return [
                'name' => 'sometimes|required',
                'summary' => 'sometimes|required',
                'description' => 'sometimes|required',
                'type' => ['sometimes', 'required', Rule::in(array_column(VacancyType::cases(), 'value'))],
                'status' => ['sometimes', 'required', Rule::in(array_column(VacancyStatus::cases(), 'value'))],
            ];
        }
    }
}
