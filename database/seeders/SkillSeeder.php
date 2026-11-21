<?php

namespace Database\Seeders;

use App\Models\PortfolioProfile;
use App\Models\Skill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SkillSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the default skills for the completed portfolio profile.
     */
    public function run(): void
    {
        $profile = PortfolioProfile::query()->completed()->first();

        if ($profile === null) {
            return;
        }

        $skills = [
            ['name' => 'React', 'category' => 'Frontend Development', 'level' => 'Advanced', 'sort_order' => 1],
            ['name' => 'TypeScript', 'category' => 'Frontend Development', 'level' => 'Intermediate', 'sort_order' => 2],
            ['name' => 'Laravel', 'category' => 'Backend Development', 'level' => 'Advanced', 'sort_order' => 3],
            ['name' => 'PHP', 'category' => 'Backend Development', 'level' => 'Advanced', 'sort_order' => 4],
            ['name' => 'MySQL', 'category' => 'Database', 'level' => 'Intermediate', 'sort_order' => 5],
            ['name' => 'MikroTik', 'category' => 'Networking', 'level' => 'Advanced', 'sort_order' => 6],
        ];

        foreach ($skills as $skill) {
            Skill::query()->firstOrCreate(
                ['portfolio_profile_id' => $profile->id, 'name' => $skill['name']],
                $skill,
            );
        }
    }
}
