<?php

namespace App\Http\Resources;

use App\Enums\VacancyStatus;
use App\Enums\VacancyType;
use Illuminate\Http\Resources\Json\JsonResource;

class VacancyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'summary' => $this->summary,
            'description' => $this->description,
            'type' => $this->type,
            'type_description' => VacancyType::from($this->type)->description(),
            'status' => $this->status,
            'status_description' => VacancyStatus::from($this->status)->description(),
            'created_at' => $this->created_at,
        ];
    }
}
