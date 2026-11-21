<?php

namespace Database\Seeders;

use App\Models\Experience;
use App\Models\PortfolioProfile;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperienceSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the default experiences for the completed portfolio profile.
     */
    public function run(): void
    {
        $profile = PortfolioProfile::query()->completed()->first();

        if ($profile === null) {
            return;
        }

        $experiences = [
            [
                'eyebrow' => 'Independent',
                'title' => 'Freelance IT Support',
                'description' => 'Network troubleshooting, MikroTik deployment, Linux server administration, and infrastructure consulting.',
                'icon' => 'Server',
                'sort_order' => 1,
            ],
            [
                'eyebrow' => 'Personal Projects',
                'title' => 'Independent Developer',
                'description' => 'Designing and engineering commercial desktop/enterprise applications and open-source networking tools.',
                'icon' => 'Code2',
                'sort_order' => 2,
            ],
        ];

        foreach ($experiences as $experience) {
            Experience::query()->firstOrCreate(
                ['portfolio_profile_id' => $profile->id, 'title' => $experience['title']],
                $experience,
            );
        }
    }
}
