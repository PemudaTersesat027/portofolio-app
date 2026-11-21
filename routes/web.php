<?php

use App\Http\Controllers\ExperienceController;
use App\Http\Controllers\IdentityController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\SetupController;
use App\Http\Controllers\SkillController;
use App\Models\PortfolioProfile;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $profile = PortfolioProfile::completed()->firstOrFail();

    $projects = $profile->projects()
        ->ordered()
        ->get()
        ->map->toPortfolioArray()
        ->values()
        ->all();

    return Inertia::render('Welcome', [
        'profile' => [
            'name' => $profile->name,
            'initials' => $profile->initials,
            'role' => $profile->role,
            'location' => $profile->location,
            'email' => $profile->email,
            'github' => $profile->github_url,
            'linkedin' => $profile->linkedin_url,
            'avatar' => $profile->avatar_url,
            'heroImage' => $profile->hero_image_url,
            'description' => $profile->description,
            'about' => $profile->about,
        ],
        'skills' => $profile->skills()
            ->ordered()
            ->get()
            ->map->toPortfolioArray()
            ->values()
            ->all(),
        'experiences' => $profile->experiences()
            ->ordered()
            ->get()
            ->map->toPortfolioArray()
            ->values()
            ->all(),
        'projects' => $projects,
        'statistics' => [
            ['value' => (string) count($projects), 'label' => 'Software Products'],
            [
                'value' => (string) collect($projects)
                    ->where('developmentStatus', 'released')
                    ->where('sourceType', 'closed-source')
                    ->count(),
                'label' => 'Commercial Releases',
            ],
            [
                'value' => (string) collect($projects)
                    ->where('sourceType', 'open-source')
                    ->count(),
                'label' => 'Open-Source Tools',
            ],
            ['value' => $profile->location ?: '—', 'label' => 'Based in'],
        ],
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->middleware('setup.complete')->name('welcome');

Route::get('/dashboard', function (Request $request) {
    /** @var User $user */
    $user = $request->user();

    $profile = PortfolioProfile::query()
        ->where('user_id', $user->id)
        ->firstOrFail();

    return Inertia::render('Dashboard', [
        'profile' => [
            'name' => $profile->name,
            'role' => $profile->role,
            'location' => $profile->location,
            'email' => $profile->email,
            'avatar' => $profile->avatar_url,
            'setupCompletedAt' => $profile->setup_completed_at?->toISOString(),
        ],
        'counts' => [
            'skills' => $profile->skills()->count(),
            'projects' => $profile->projects()->count(),
            'experiences' => $profile->experiences()->count(),
        ],
    ]);
})->middleware(['auth', 'verified', 'setup.complete'])->name('dashboard');

Route::middleware(['auth', 'verified', 'setup.complete'])
    ->prefix('admin')
    ->name('admin.')
    ->group(function (): void {
        Route::get('identity', [IdentityController::class, 'edit'])->name('identity.edit');
        Route::put('identity', [IdentityController::class, 'update'])->name('identity.update');

        Route::get('skills', [SkillController::class, 'index'])->name('skills.index');
        Route::post('skills', [SkillController::class, 'store'])->name('skills.store');
        Route::put('skills/{skill}', [SkillController::class, 'update'])->name('skills.update');
        Route::delete('skills/{skill}', [SkillController::class, 'destroy'])->name('skills.destroy');

        Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
        Route::post('projects', [ProjectController::class, 'store'])->name('projects.store');
        Route::put('projects/{project}', [ProjectController::class, 'update'])->name('projects.update');
        Route::delete('projects/{project}', [ProjectController::class, 'destroy'])->name('projects.destroy');

        Route::get('experiences', [ExperienceController::class, 'index'])->name('experiences.index');
        Route::post('experiences', [ExperienceController::class, 'store'])->name('experiences.store');
        Route::put('experiences/{experience}', [ExperienceController::class, 'update'])->name('experiences.update');
        Route::delete('experiences/{experience}', [ExperienceController::class, 'destroy'])->name('experiences.destroy');
    });

Route::middleware('setup.pending')->group(function () {
    Route::get('/setup', [SetupController::class, 'createAccount'])
        ->name('setup.account');

    Route::post('/setup', [SetupController::class, 'storeAccount']);

    Route::middleware('auth')->group(function () {
        Route::get('/setup/identity', [SetupController::class, 'createIdentity'])
            ->name('setup.identity');

        Route::post('/setup/identity', [SetupController::class, 'storeIdentity'])
            ->name('setup.identity.store');
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
