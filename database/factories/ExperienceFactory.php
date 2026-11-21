<?php

namespace Database\Factories;

use App\Models\Experience;
use App\Models\PortfolioProfile;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Experience>
 */
class ExperienceFactory extends Factory
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
            'eyebrow' => fake()->randomElement(['Independent', 'Freelance', 'Personal Projects']),
            'title' => fake()->jobTitle(),
            'description' => fake()->paragraph(),
            'icon' => fake()->randomElement(['Code2', 'Server', 'BriefcaseBusiness', 'Wrench']),
            'sort_order' => fake()->numberBetween(0, 20),
        ];
    }
}
