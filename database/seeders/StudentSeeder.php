<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create the student role
        $studentRole = Role::firstOrCreate(['name' => 'student']);

        // Create 50 students with their associated user accounts
        Student::factory(50)->create()->each(function ($student) use ($studentRole) {
            // Assign the student role to the user
            $user = User::find($student->user_id);
            $user->assignRole($studentRole);
        });
    }
}
