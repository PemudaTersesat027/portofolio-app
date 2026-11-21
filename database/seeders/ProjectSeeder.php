<?php

namespace Database\Seeders;

use App\Models\PortfolioProfile;
use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the default projects for the completed portfolio profile.
     */
    public function run(): void
    {
        $profile = PortfolioProfile::query()->completed()->first();

        if ($profile === null) {
            return;
        }

        $projects = [
            [
                'title' => 'ISP Management System',
                'category' => 'Desktop Application',
                'description' => 'A centralized platform for managing ISP subscribers, services, billing, and network monitoring.',
                'version' => '0.5.0',
                'development_status' => 'development',
                'source_type' => 'closed-source',
                'sales_status' => 'pre-order',
                'tags' => ['Rust', 'React', 'MySQL', 'MikroTik'],
                'price' => 2500000,
                'preorder_price' => 1500000,
                'preorder_deadline' => '2027-03-31',
                'preorder_limit' => 20,
                'preorder_sold' => 8,
                'sort_order' => 1,
            ],
            [
                'title' => 'Warehouse Management System',
                'category' => 'Enterprise Application',
                'description' => 'An integrated warehouse management solution for inventory, stock movement, and operational workflows.',
                'version' => '1.0.0',
                'development_status' => 'released',
                'source_type' => 'closed-source',
                'sales_status' => 'available',
                'tags' => ['Laravel', 'React', 'TypeScript', 'MySQL'],
                'price' => 3500000,
                'live_url' => 'https://example.com/demo',
                'trial_url' => 'https://example.com/trial',
                'sort_order' => 2,
            ],
            [
                'title' => 'Personal Portfolio',
                'category' => 'Web Application',
                'description' => 'A personal portfolio website built with modern web technologies and a minimal interface.',
                'version' => '1.0.0',
                'development_status' => 'released',
                'source_type' => 'open-source',
                'sales_status' => 'not-for-sale',
                'tags' => ['React', 'TypeScript', 'Tailwind CSS'],
                'live_url' => 'https://example.com',
                'github_url' => 'https://github.com/',
                'sort_order' => 3,
            ],
        ];

        foreach ($projects as $project) {
            Project::query()->firstOrCreate(
                ['portfolio_profile_id' => $profile->id, 'title' => $project['title']],
                $project,
            );
        }
    }
}
