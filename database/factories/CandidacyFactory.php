<?php

namespace Database\Factories;

use App\Enums\CandidacyStatus;
use App\Enums\UserRole;
use App\Models\User;
use App\Models\Vacancy;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Candidacy>
 */
class CandidacyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $status = collect(CandidacyStatus::cases());

        $users = User::where('role', '!=', UserRole::ADMIN)->get()->pluck('id');
        $vacancies = Vacancy::all()->pluck('id');

        return [
            'user_id' => $users->random(),
            'vacancy_id' => $vacancies->random(),
            'status' => $status->random()
        ];
    }
}
