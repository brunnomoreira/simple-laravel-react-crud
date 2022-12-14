<?php

namespace Database\Seeders;

use App\Models\Candidacy;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CandidacySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Candidacy::factory()
        ->count(30)
        ->create();
    }
}
