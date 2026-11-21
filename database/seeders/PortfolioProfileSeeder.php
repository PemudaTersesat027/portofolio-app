<?php

namespace Database\Seeders;

use App\Models\PortfolioProfile;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PortfolioProfileSeeder extends Seeder
{
    /**
     * Seed a completed setup for local previews.
     *
     * This seeder is intentionally not called by DatabaseSeeder so a fresh
     * installation still enters the first-run setup flow.
     */
    public function run(): void
    {
        $user = User::query()->firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Erick Al Aziz',
                'password' => Hash::make('password'),
            ],
        );

        PortfolioProfile::query()->firstOrCreate(
            ['user_id' => $user->id],
            [
                'name' => 'Erick Al Aziz',
                'role' => 'Developer & IT Enthusiast',
                'location' => 'Indonesia',
                'email' => 'admin@example.com',
                'description' => 'I build digital products, enterprise applications, and network infrastructure solutions.',
                'github_url' => 'https://github.com/erickalaziz',
                'linkedin_url' => 'https://linkedin.com/in/erickalaziz',
                'about' => 'I am an independent developer with an interest in software engineering, networking, and infrastructure.',
                'avatar_path' => 'portfolio/avatars/avatar.jpg',
                'hero_image_path' => 'portfolio/hero/hero.jpg',
                'setup_completed_at' => now(),
            ],
        );

        $this->call([
            SkillSeeder::class,
            ProjectSeeder::class,
            ExperienceSeeder::class,
        ]);
    }
}
