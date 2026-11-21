<?php

namespace Database\Factories;

use App\Models\PortfolioProfile;
use App\Models\Project;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
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
            'title' => fake()->sentence(3),
            'category' => fake()->randomElement([
                'Web Application',
                'Desktop Application',
                'Networking Tool',
                'Business Application',
            ]),
            'description' => fake()->paragraph(),
            'image_path' => null,
            'external_image_url' => null,
            'version' => '1.0.0',
            'development_status' => 'released',
            'source_type' => 'open-source',
            'sales_status' => 'not-for-sale',
            'tags' => ['Laravel', 'React'],
            'price' => null,
            'preorder_price' => null,
            'preorder_deadline' => null,
            'preorder_limit' => null,
            'preorder_sold' => 0,
            'purchase_url' => null,
            'live_url' => 'https://example.com',
            'trial_url' => null,
            'github_url' => 'https://github.com/example',
            'sort_order' => fake()->numberBetween(0, 20),
        ];
    }
}
