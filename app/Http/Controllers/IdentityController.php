<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateIdentityRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class IdentityController extends Controller
{
    /**
     * Display the editable portfolio identity.
     */
    public function edit(Request $request): Response
    {
        $profile = $this->currentPortfolioProfile($request);

        return Inertia::render('admin/Identity', [
            'profile' => [
                'name' => $profile->name,
                'role' => $profile->role,
                'location' => $profile->location,
                'email' => $profile->email,
                'description' => $profile->description,
                'github_url' => $profile->github_url,
                'linkedin_url' => $profile->linkedin_url,
                'about' => $profile->about,
                'avatar' => $profile->avatar_url,
                'heroImage' => $profile->hero_image_url,
            ],
        ]);
    }

    /**
     * Update the portfolio identity and its optional images.
     */
    public function update(UpdateIdentityRequest $request): RedirectResponse
    {
        $profile = $this->currentPortfolioProfile($request);

        $data = $request->validated();
        unset($data['avatar'], $data['hero_image']);

        $avatarPath = $this->storeUploadedImage(
            $request,
            'avatar',
            'portfolio/avatars',
            $profile->avatar_path,
        );

        $heroImagePath = $this->storeUploadedImage(
            $request,
            'hero_image',
            'portfolio/hero',
            $profile->hero_image_path,
        );

        if ($avatarPath !== null) {
            $data['avatar_path'] = $avatarPath;
        }

        if ($heroImagePath !== null) {
            $data['hero_image_path'] = $heroImagePath;
        }

        $profile->update($data);

        return back()->with('status', 'Identitas portofolio berhasil diperbarui.');
    }
}
