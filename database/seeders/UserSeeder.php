<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'Surya wana bakti',
            'username' => 'surya',
            'password' => bcrypt('qwerty123'),
        ])->assignRole('super');

        User::create([
            'name' => 'Super Admin',
            'username' => 'superadmin',
            'password' => bcrypt('qwerty123'),
        ])->assignRole('super');

        User::create([
            'name' => 'Admin',
            'username' => 'admin',
            'password' => bcrypt('qwerty123'),
        ])->assignRole('admin');

        User::create([
            'name' => 'Staff',
            'username' => 'staff',
            'password' => bcrypt('qwerty123'),
        ])->assignRole('staff');
    }
}
