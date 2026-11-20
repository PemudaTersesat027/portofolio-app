<?php

namespace Database\Factories;

use App\Models\PortfolioProfile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<PortfolioProfile>
 */
class PortfolioProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->name(),
            'role' => 'Developer & IT Enthusiast',
            'location' => 'Indonesia',
            'email' => fake()->safeEmail(),
            'description' => 'I build digital products, enterprise applications, and network infrastructure solutions.',
            'github_url' => 'https://github.com/erickalaziz',
            'linkedin_url' => 'https://linkedin.com/in/erickalaziz',
            'about' => fake()->paragraph(),
            'avatar_path' => 'portfolio/avatars/avatar.jpg',
            'hero_image_path' => 'portfolio/hero/hero.jpg',
            'setup_completed_at' => now(),
        ];
    }

    /**
     * Indicate that the identity setup has not been completed.
     */
    public function incomplete(): static
    {
        return $this->state(fn (array $attributes): array => [
            'setup_completed_at' => null,
        ]);
    }
}
