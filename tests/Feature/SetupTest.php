<?php

use App\Models\PortfolioProfile;
use App\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;

function validIdentityPayload(): array
{
    return [
        'name' => 'Erick Al Aziz',
        'role' => 'Developer & IT Enthusiast',
        'location' => 'Indonesia',
        'email' => 'hello@example.com',
        'description' => 'I build digital products and infrastructure solutions.',
        'github_url' => 'https://github.com/erickalaziz',
        'linkedin_url' => 'https://linkedin.com/in/erickalaziz',
        'about' => 'I am an independent developer focused on practical solutions.',
    ];
}

function fakeIdentityImages(): array
{
    $image = file_get_contents(__DIR__.'/../Fixtures/avatar.png');

    return [
        'avatar' => UploadedFile::fake()->createWithContent('avatar.png', $image),
        'hero_image' => UploadedFile::fake()->createWithContent('hero.png', $image),
    ];
}

it('redirects visitors to setup while identity is missing', function () {
    $this->get('/')->assertRedirect(route('setup.account', absolute: false));

    $user = User::factory()->create();

    $this->actingAs($user)
        ->get('/')
        ->assertRedirect(route('setup.identity', absolute: false));

    $this->actingAs($user)
        ->get(route('dashboard'))
        ->assertRedirect(route('setup.identity', absolute: false));
});

it('renders the account setup step on a fresh application', function () {
    $this->get(route('setup.account'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('Setup/Account'));
});

it('creates the first admin account and continues to the identity step', function () {
    $response = $this->post(route('setup.account'), [
        'name' => 'Admin User',
        'email' => 'admin@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $this->assertDatabaseHas('users', ['email' => 'admin@example.com']);
    $response->assertRedirect(route('setup.identity', absolute: false));
});

it('does not allow another admin account after the first one exists', function () {
    User::factory()->create();

    $this->post(route('setup.account'), [
        'name' => 'Second Admin',
        'email' => 'second@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ])->assertRedirect(route('login', absolute: false));

    $this->assertDatabaseMissing('users', ['email' => 'second@example.com']);
});

it('renders the identity step with account details prefilled', function () {
    $user = User::factory()->create([
        'name' => 'Admin User',
        'email' => 'admin@example.com',
    ]);

    $this->actingAs($user)
        ->get(route('setup.identity'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Setup/Identity')
            ->where('profile.name', 'Admin User')
            ->where('profile.email', 'admin@example.com'));
});

it('requires both image uploads', function () {
    $user = User::factory()->create();

    $this->actingAs($user)
        ->post(route('setup.identity'), validIdentityPayload())
        ->assertSessionHasErrors(['avatar', 'hero_image']);
});

it('stores the identity uploads and redirects to the dashboard', function () {
    Storage::fake('public');

    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(
        route('setup.identity'),
        validIdentityPayload() + fakeIdentityImages(),
    );

    $profile = PortfolioProfile::query()
        ->where('user_id', $user->id)
        ->firstOrFail();

    $response->assertRedirect(route('dashboard', absolute: false));
    $this->assertNotNull($profile->setup_completed_at);
    expect($profile->name)->toBe('Erick Al Aziz');
    Storage::disk('public')->assertExists($profile->avatar_path);
    Storage::disk('public')->assertExists($profile->hero_image_path);
});

it('blocks the setup pages once setup is complete', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)
        ->get(route('setup.account'))
        ->assertRedirect(route('dashboard', absolute: false));

    $this->actingAs($profile->user)
        ->get(route('setup.identity'))
        ->assertRedirect(route('dashboard', absolute: false));
});

it('renders the dashboard with the saved profile', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->actingAs($profile->user)
        ->get(route('dashboard'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->where('profile.name', $profile->name));
});

it('renders the portfolio with the persisted profile after setup', function () {
    $profile = PortfolioProfile::factory()->create();

    $this->get('/')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('Welcome')
            ->where('profile.name', $profile->name)
            ->where('profile.avatar', $profile->avatar_url));
});
