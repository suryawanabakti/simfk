<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'username' => $this->faker->unique()->numerify('F#########'),
            // 'email' => $this->faker->unique()->safeEmail(),
            // 'email_verified_at' => now(),
            'password' => Hash::make('password'), // Default password for all seeded users
            'remember_token' => Str::random(10),
            'photo' => null,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn(array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Configure the model factory to create a student user.
     */
    public function student(): static
    {
        return $this->state(function (array $attributes) {
            return [
                'username' => 'F' . $this->faker->unique()->numerify('########'),
            ];
        });
    }
}
