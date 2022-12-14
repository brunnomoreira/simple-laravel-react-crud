<?php

namespace App\Models;

use App\Enums\VacancyStatus;
use App\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Vacancy extends Model
{
    use HasFactory, Filterable;

    protected $fillable = [
        'name',
        'summary',
        'description',
        'type',
        'status'
    ];

    public function candidacies() : HasMany 
    {
        return $this->hasMany(Candidacy::class, 'vacancy_id');
    }

    public function scopeActives(Builder $query)
    {
        return $query->where('status', VacancyStatus::OPEN);
    }

    public static function searchable() : array 
    {
        return [
            'id',
            'name',
            'summary',
            'description',
            'type',
            'status'
        ];
    }
}
