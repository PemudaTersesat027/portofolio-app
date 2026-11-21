<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreExperienceRequest;
use App\Http\Requests\UpdateExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    /**
     * Display the experience management page.
     */
    public function index(Request $request): Response
    {
        $profile = $this->currentPortfolioProfile($request);

        return Inertia::render('admin/Experience', [
            'experiences' => $profile->experiences()
                ->ordered()
                ->get()
                ->map->toPortfolioArray()
                ->values()
                ->all(),
        ]);
    }

    /**
     * Store a new experience for the current portfolio profile.
     */
    public function store(StoreExperienceRequest $request): RedirectResponse
    {
        $profile = $this->currentPortfolioProfile($request);

        $profile->experiences()->create($request->validated());

        return back()->with('status', 'Pengalaman berhasil ditambahkan.');
    }

    /**
     * Update an existing experience owned by the current portfolio profile.
     */
    public function update(UpdateExperienceRequest $request, Experience $experience): RedirectResponse
    {
        $experience = $this->currentPortfolioProfile($request)
            ->experiences()
            ->findOrFail($experience->id);

        $experience->update($request->validated());

        return back()->with('status', 'Pengalaman berhasil diperbarui.');
    }

    /**
     * Delete an existing experience owned by the current portfolio profile.
     */
    public function destroy(Request $request, Experience $experience): RedirectResponse
    {
        $experience = $this->currentPortfolioProfile($request)
            ->experiences()
            ->findOrFail($experience->id);

        $experience->delete();

        return back()->with('status', 'Pengalaman berhasil dihapus.');
    }
}
