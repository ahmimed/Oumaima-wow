<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;


class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
           User::create([
        'name' => 'Admin',
        'email' => 'admin@wow.com',
        'password' => Hash::make('password'), // change le mot de passe !
        'role' => 'admin',
    ]);
    }
}
