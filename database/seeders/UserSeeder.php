<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Create admin user
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@local.com',
            'password' => Hash::make('123'),
            'role' => UserRole::ADMIN
        ]);

        //Create candidates users
        User::factory()
            ->count(50)
            ->create();
    }
}
