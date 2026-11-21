<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    /**
     * Display the project management page.
     */
    public function index(Request $request): Response
    {
        $profile = $this->currentPortfolioProfile($request);

        return Inertia::render('admin/Project', [
            'projects' => $profile->projects()
                ->ordered()
                ->get()
                ->values()
                ->all(),
        ]);
    }

    /**
     * Store a new project for the current portfolio profile.
     */
    public function store(StoreProjectRequest $request): RedirectResponse
    {
        $profile = $this->currentPortfolioProfile($request);

        $data = $this->normalizeProjectData($request->validated());
        unset($data['image']);

        $imagePath = $this->storeUploadedImage($request, 'image', 'portfolio/projects');

        if ($imagePath !== null) {
            $data['image_path'] = $imagePath;
        }

        $profile->projects()->create($data);

        return back()->with('status', 'Proyek berhasil ditambahkan.');
    }

    /**
     * Update an existing project owned by the current portfolio profile.
     */
    public function update(UpdateProjectRequest $request, Project $project): RedirectResponse
    {
        $project = $this->currentPortfolioProfile($request)
            ->projects()
            ->findOrFail($project->id);

        $data = $this->normalizeProjectData($request->validated());
        unset($data['image']);

        $imagePath = $this->storeUploadedImage(
            $request,
            'image',
            'portfolio/projects',
            $project->image_path,
        );

        if ($imagePath !== null) {
            $data['image_path'] = $imagePath;
        }

        $project->update($data);

        return back()->with('status', 'Proyek berhasil diperbarui.');
    }

    /**
     * Delete an existing project owned by the current portfolio profile.
     */
    public function destroy(Request $request, Project $project): RedirectResponse
    {
        $project = $this->currentPortfolioProfile($request)
            ->projects()
            ->findOrFail($project->id);

        $project->delete();

        return back()->with('status', 'Proyek berhasil dihapus.');
    }

    /**
     * Normalize tags and optional numeric fields before persistence.
     *
     * @param  array<string, mixed>  $validated
     * @return array<string, mixed>
     */
    private function normalizeProjectData(array $validated): array
    {
        $validated['tags'] = collect($validated['tags'] ?? [])
            ->map(fn (string $tag): string => trim($tag))
            ->filter()
            ->unique()
            ->values()
            ->all();

        foreach (['price', 'preorder_price', 'preorder_limit', 'preorder_sold'] as $field) {
            if (($validated[$field] ?? null) === '') {
                $validated[$field] = null;
            }
        }

        return $validated;
    }
}
