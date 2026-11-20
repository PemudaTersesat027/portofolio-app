<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSetupAccountRequest;
use App\Http\Requests\StoreSetupIdentityRequest;
use App\Models\PortfolioProfile;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class SetupController extends Controller
{
    /**
     * Display the first setup step for creating the admin account.
     */
    public function createAccount(): Response
    {
        return Inertia::render('Setup/Account');
    }

    /**
     * Create the first admin account and continue to the identity step.
     */
    public function storeAccount(StoreSetupAccountRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = User::query()->create($request->validated());

        Auth::login($user);

        $request->session()->regenerate();

        return to_route('setup.identity');
    }

    /**
     * Display the identity setup form.
     */
    public function createIdentity(Request $request): Response
    {
        /** @var User $user */
        $user = $request->user();

        $profile = PortfolioProfile::query()
            ->where('user_id', $user->id)
            ->first();

        return Inertia::render('Setup/Identity', [
            'profile' => [
                'name' => $profile?->name ?? $user->name,
                'role' => $profile?->role ?? '',
                'location' => $profile?->location ?? '',
                'email' => $profile?->email ?? $user->email,
                'description' => $profile?->description ?? '',
                'github_url' => $profile?->github_url ?? '',
                'linkedin_url' => $profile?->linkedin_url ?? '',
                'about' => $profile?->about ?? '',
                'avatar' => $profile?->avatar_url,
                'heroImage' => $profile?->hero_image_url,
            ],
        ]);
    }

    /**
     * Store the identity data and complete the first-run setup.
     */
    public function storeIdentity(StoreSetupIdentityRequest $request): RedirectResponse
    {
        /** @var User $user */
        $user = $request->user();

        $profile = PortfolioProfile::query()
            ->where('user_id', $user->id)
            ->first();

        $avatarPath = $request->file('avatar')->store('portfolio/avatars', 'public');
        $heroImagePath = $request->file('hero_image')->store('portfolio/hero', 'public');

        if ($profile !== null) {
            $this->deleteReplacedImage($profile->avatar_path, $avatarPath);
            $this->deleteReplacedImage($profile->hero_image_path, $heroImagePath);
        }

        PortfolioProfile::query()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'name' => $request->input('name'),
                'role' => $request->input('role'),
                'location' => $request->input('location'),
                'email' => $request->input('email'),
                'description' => $request->input('description'),
                'github_url' => $request->input('github_url'),
                'linkedin_url' => $request->input('linkedin_url'),
                'about' => $request->input('about'),
                'avatar_path' => $avatarPath,
                'hero_image_path' => $heroImagePath,
                'setup_completed_at' => now(),
            ],
        );

        return to_route('dashboard')->with('status', 'Identitas portofolio berhasil disimpan.');
    }

    /**
     * Delete an old upload when it has been replaced by a new file.
     */
    private function deleteReplacedImage(?string $oldPath, string $newPath): void
    {
        if ($oldPath !== null && $oldPath !== $newPath) {
            Storage::disk('public')->delete($oldPath);
        }
    }
}
