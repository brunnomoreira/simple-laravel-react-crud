<?php

namespace Database\Factories;

use App\Enums\VacancyStatus;
use App\Enums\VacancyType;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vacancy>
 */
class VacancyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $types = collect(VacancyType::cases());
        $status = collect(VacancyStatus::cases());

        $nameSize = [10, 20, 30];
        $summarySize = [100, 200, 300];
        $descriptionSize = [300, 500, 800];

        return [
            'name' => fake()->text($nameSize[array_rand($nameSize)]),
            'summary' => fake()->text($summarySize[array_rand($summarySize)]),
            'description' => fake()->text($descriptionSize[array_rand($descriptionSize)]),
            'type' => $types->random(),
            'status' => $status->random()
        ];
    }
}
