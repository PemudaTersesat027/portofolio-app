<?php

use App\Models\Experience;
use App\Models\PortfolioProfile;
use App\Models\Project;
use App\Models\Skill;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

function validIdentityUpdatePayload(): array
{
    return [
        'name' => 'Erick Updated',
        'role' => 'Principal Developer',
        'location' => 'Jakarta',
        'email' => 'hello@example.com',
        'description' => 'I build reliable digital products.',
        'github_url' => 'https://github.com/erickalaziz',
        'linkedin_url' => 'https://linkedin.com/in/erickalaziz',
        'about' => 'I focus on maintainable software and resilient infrastructure.',
    ];
}

function validSkillPayload(): array
{
    return [
        'name' => 'Laravel',
        'category' => 'Backend Development',
        'level' => 'Advanced',
        'sort_order' => 1,
    ];
}

function validProjectPayload(): array
{
    return [
        'title' => 'ISP Manager',
        'category' => 'Desktop Application',
        'description' => 'A centralized platform for managing ISP operations.',
        'external_image_url' => null,
        'version' => '1.0.0',
        'development_status' => 'released',
        'source_type' => 'closed-source',
        'sales_status' => 'available',
        'tags' => ['Laravel', 'React', 'MySQL'],
        'price' => 2500000,
        'preorder_price' => null,
        'preorder_deadline' => null,
        'preorder_limit' => null,
        'preorder_sold' => 0,
        'purchase_url' => null,
        'live_url' => 'https://example.com',
        'trial_url' => null,
        'github_url' => null,
        'sort_order' => 1,
    ];
}

function validExperiencePayload(): array
{
    return [
        'eyebrow' => 'Independent',
        'title' => 'Freelance IT Support',
        'description' => 'Network troubleshooting and Linux server administration.',
        'icon' => 'Server',
        'sort_order' => 1,
    ];
}

function fakePortfolioImage(string $name = 'preview.png'): UploadedFile
{
    return UploadedFile::fake()->createWithContent(
        $name,
        file_get_contents(__DIR__.'/../Fixtures/avatar.png'),
    );
}

it('requires authentication for portfolio management', function () {
    $this->get(route('admin.skills.index'))->assertRedirect(route('login', absolute: false));

    $this->post(route('admin.skills.store'), validSkillPayload())
        ->assertRedirect(route('login', absolute: false));
});

it('renders the editable identity for the authenticated profile', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)
        ->get(route('admin.identity.edit'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/Identity')
            ->where('profile.name', $profile->name)
            ->where('profile.email', $profile->email));
});

it('updates the identity and replaces uploaded images', function () {
    Storage::fake('public');

    $profile = PortfolioProfile::factory()->create([
        'avatar_path' => 'old/avatar.png',
        'hero_image_path' => 'old/hero.png',
    ]);

    Storage::disk('public')->put('old/avatar.png', 'old avatar');
    Storage::disk('public')->put('old/hero.png', 'old hero');

    $this->actingAs($profile->user)->put(
        route('admin.identity.update'),
        validIdentityUpdatePayload() + [
            'avatar' => fakePortfolioImage('avatar.png'),
            'hero_image' => fakePortfolioImage('hero.png'),
        ],
    )->assertSessionHas('status', 'Identitas portofolio berhasil diperbarui.');

    $profile->refresh();

    expect($profile->name)->toBe('Erick Updated')
        ->and($profile->role)->toBe('Principal Developer');

    Storage::disk('public')->assertExists($profile->avatar_path);
    Storage::disk('public')->assertExists($profile->hero_image_path);
    Storage::disk('public')->assertMissing('old/avatar.png');
    Storage::disk('public')->assertMissing('old/hero.png');
});

it('validates identity updates', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)
        ->put(route('admin.identity.update'), ['name' => 'Erick Updated'])
        ->assertSessionHasErrors(['role', 'location', 'email', 'description', 'about']);
});

it('lists persisted skills on the admin page', function () {
    $profile = PortfolioProfile::factory()->create();
    $skill = Skill::factory()->for($profile, 'portfolioProfile')->create([
        'name' => 'Laravel',
        'category' => 'Backend Development',
    ]);

    $this->actingAs($profile->user)
        ->get(route('admin.skills.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/Skill')
            ->where('skills.0.id', $skill->id)
            ->where('skills.0.name', 'Laravel'));
});

it('validates skills before storing them', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)
        ->post(route('admin.skills.store'), [
            'name' => '',
            'category' => '',
            'level' => 'Master',
        ])
        ->assertSessionHasErrors(['name', 'category', 'level']);
});

it('stores, updates, and deletes skills', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)
        ->post(route('admin.skills.store'), validSkillPayload())
        ->assertSessionHas('status', 'Skill berhasil ditambahkan.');

    $skill = Skill::query()->where('portfolio_profile_id', $profile->id)->firstOrFail();

    expect($skill->name)->toBe('Laravel')
        ->and($skill->level)->toBe('Advanced');

    $this->actingAs($profile->user)
        ->put(
            route('admin.skills.update', $skill),
            array_merge(validSkillPayload(), ['name' => 'Laravel 13', 'level' => 'Expert']),
        )
        ->assertSessionHas('status', 'Skill berhasil diperbarui.');

    expect($skill->refresh()->name)->toBe('Laravel 13')
        ->and($skill->level)->toBe('Expert');

    $this->actingAs($profile->user)
        ->delete(route('admin.skills.destroy', $skill))
        ->assertSessionHas('status', 'Skill berhasil dihapus.');

    $this->assertDatabaseMissing('skills', ['id' => $skill->id]);
});

it('does not allow editing a skill owned by another profile', function () {
    $profile = PortfolioProfile::factory()->create();
    $otherSkill = Skill::factory()->create();

    $this->actingAs($profile->user)
        ->put(route('admin.skills.update', $otherSkill), validSkillPayload())
        ->assertNotFound();
});

it('lists persisted projects on the admin page', function () {
    $profile = PortfolioProfile::factory()->create();
    $project = Project::factory()->for($profile, 'portfolioProfile')->create([
        'title' => 'ISP Manager',
    ]);

    $this->actingAs($profile->user)
        ->get(route('admin.projects.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/Project')
            ->where('projects.0.id', $project->id)
            ->where('projects.0.title', 'ISP Manager'));
});

it('stores a project with normalized tags and an uploaded image', function () {
    Storage::fake('public');

    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)->post(
        route('admin.projects.store'),
        validProjectPayload() + ['image' => fakePortfolioImage()],
    )->assertSessionHas('status', 'Proyek berhasil ditambahkan.');

    $project = Project::query()->where('portfolio_profile_id', $profile->id)->firstOrFail();

    expect($project->tags)->toBe(['Laravel', 'React', 'MySQL'])
        ->and($project->development_status)->toBe('released');

    Storage::disk('public')->assertExists($project->image_path);
});

it('updates and deletes projects while replacing old images', function () {
    Storage::fake('public');

    $profile = PortfolioProfile::factory()->create();
    $project = Project::factory()->for($profile, 'portfolioProfile')->create([
        'image_path' => 'old/project.png',
    ]);

    Storage::disk('public')->put('old/project.png', 'old project');

    $this->actingAs($profile->user)->put(
        route('admin.projects.update', $project),
        array_merge(validProjectPayload(), [
            'title' => 'ISP Manager 2',
            'image' => fakePortfolioImage('updated.png'),
        ]),
    )->assertSessionHas('status', 'Proyek berhasil diperbarui.');

    $project->refresh();

    expect($project->title)->toBe('ISP Manager 2');

    Storage::disk('public')->assertExists($project->image_path);
    Storage::disk('public')->assertMissing('old/project.png');

    $this->actingAs($profile->user)
        ->delete(route('admin.projects.destroy', $project))
        ->assertSessionHas('status', 'Proyek berhasil dihapus.');

    $this->assertDatabaseMissing('projects', ['id' => $project->id]);
});

it('validates projects before storing them', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)
        ->post(route('admin.projects.store'), [
            'title' => '',
            'description' => '',
            'development_status' => 'unknown',
            'source_type' => 'unknown',
            'sales_status' => 'unknown',
        ])
        ->assertSessionHasErrors([
            'title',
            'description',
            'development_status',
            'source_type',
            'sales_status',
        ]);
});

it('does not allow editing a project owned by another profile', function () {
    $profile = PortfolioProfile::factory()->create();
    $otherProject = Project::factory()->create();

    $this->actingAs($profile->user)
        ->put(route('admin.projects.update', $otherProject), validProjectPayload())
        ->assertNotFound();
});

it('manages experiences for the authenticated profile', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)
        ->get(route('admin.experiences.index'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/Experience'));

    $this->actingAs($profile->user)
        ->post(route('admin.experiences.store'), validExperiencePayload())
        ->assertSessionHas('status', 'Pengalaman berhasil ditambahkan.');

    $experience = Experience::query()
        ->where('portfolio_profile_id', $profile->id)
        ->firstOrFail();

    $this->actingAs($profile->user)
        ->put(
            route('admin.experiences.update', $experience),
            array_merge(validExperiencePayload(), ['title' => 'Senior IT Support']),
        )
        ->assertSessionHas('status', 'Pengalaman berhasil diperbarui.');

    expect($experience->refresh()->title)->toBe('Senior IT Support');

    $this->actingAs($profile->user)
        ->delete(route('admin.experiences.destroy', $experience))
        ->assertSessionHas('status', 'Pengalaman berhasil dihapus.');

    $this->assertDatabaseMissing('experiences', ['id' => $experience->id]);
});

it('validates experiences before storing them', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)
        ->post(route('admin.experiences.store'), [
            'eyebrow' => '',
            'title' => '',
            'description' => '',
            'icon' => 'UnknownIcon',
        ])
        ->assertSessionHasErrors(['eyebrow', 'title', 'description', 'icon']);
});

it('does not allow editing an experience owned by another profile', function () {
    $profile = PortfolioProfile::factory()->create();
    $otherExperience = Experience::factory()->create();

    $this->actingAs($profile->user)
        ->put(route('admin.experiences.update', $otherExperience), validExperiencePayload())
        ->assertNotFound();
});

it('exposes managed content on the public portfolio and dashboard', function () {
    $profile = PortfolioProfile::factory()->create();

    Skill::factory()->for($profile, 'portfolioProfile')->create([
        'name' => 'Laravel',
        'category' => 'Backend Development',
        'sort_order' => 1,
    ]);

    Experience::factory()->for($profile, 'portfolioProfile')->create([
        'title' => 'Independent Developer',
        'sort_order' => 1,
    ]);

    Project::factory()->for($profile, 'portfolioProfile')->create([
        'title' => 'ISP Manager',
        'development_status' => 'released',
        'source_type' => 'closed-source',
        'tags' => ['Laravel', 'React'],
        'sort_order' => 1,
    ]);

    Project::factory()->for($profile, 'portfolioProfile')->create([
        'title' => 'Network Monitor',
        'development_status' => 'development',
        'source_type' => 'open-source',
        'tags' => ['MikroTik'],
        'sort_order' => 2,
    ]);

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
            ->where('skills.0.name', 'Laravel')
            ->where('experiences.0.title', 'Independent Developer')
            ->where('projects.0.title', 'ISP Manager')
            ->where('projects.0.tags', ['Laravel', 'React'])
            ->where('statistics.0.value', '2')
            ->where('statistics.1.value', '1')
            ->where('statistics.2.value', '1')
            ->where('statistics.3.value', $profile->location)
            ->where('statistics.3.label', 'Based in'));

    $this->actingAs($profile->user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->where('counts.skills', 1)
            ->where('counts.projects', 2)
            ->where('counts.experiences', 1));
});
