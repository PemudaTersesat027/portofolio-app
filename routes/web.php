<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SetupController;
use App\Models\PortfolioProfile;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $profile = PortfolioProfile::completed()->firstOrFail();

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
    ]);
})->middleware(['auth', 'verified', 'setup.complete'])->name('dashboard');

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
