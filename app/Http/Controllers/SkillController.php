<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSkillRequest;
use App\Http\Requests\UpdateSkillRequest;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    /**
     * Display the skill management page.
     */
    public function index(Request $request): Response
    {
        $profile = $this->currentPortfolioProfile($request);

        return Inertia::render('admin/Skill', [
            'skills' => $profile->skills()
                ->ordered()
                ->get()
                ->map->toPortfolioArray()
                ->values()
                ->all(),
        ]);
    }

    /**
     * Store a new skill for the current portfolio profile.
     */
    public function store(StoreSkillRequest $request): RedirectResponse
    {
        $profile = $this->currentPortfolioProfile($request);

        $profile->skills()->create($request->validated());

        return back()->with('status', 'Skill berhasil ditambahkan.');
    }

    /**
     * Update an existing skill owned by the current portfolio profile.
     */
    public function update(UpdateSkillRequest $request, Skill $skill): RedirectResponse
    {
        $skill = $this->currentPortfolioProfile($request)
            ->skills()
            ->findOrFail($skill->id);

        $skill->update($request->validated());

        return back()->with('status', 'Skill berhasil diperbarui.');
    }

    /**
     * Delete an existing skill owned by the current portfolio profile.
     */
    public function destroy(Request $request, Skill $skill): RedirectResponse
    {
        $skill = $this->currentPortfolioProfile($request)
            ->skills()
            ->findOrFail($skill->id);

        $skill->delete();

        return back()->with('status', 'Skill berhasil dihapus.');
    }
}
