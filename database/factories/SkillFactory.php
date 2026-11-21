<?php

namespace Database\Factories;

use App\Models\PortfolioProfile;
use App\Models\Skill;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Skill>
 */
class SkillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'portfolio_profile_id' => PortfolioProfile::factory(),
            'name' => fake()->unique()->word(),
            'category' => fake()->randomElement([
                'Frontend Development',
                'Backend Development',
                'Database',
                'Networking',
            ]),
            'level' => fake()->randomElement(['Beginner', 'Intermediate', 'Advanced', 'Expert']),
            'sort_order' => fake()->numberBetween(0, 20),
        ];
    }
}
