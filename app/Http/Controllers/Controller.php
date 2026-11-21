<?php

namespace App\Http\Controllers;

use App\Models\PortfolioProfile;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

abstract class Controller
{
    /**
     * Resolve the portfolio profile owned by the authenticated user.
     */
    protected function currentPortfolioProfile(Request $request): PortfolioProfile
    {
        return PortfolioProfile::query()
            ->where('user_id', $request->user()?->id)
            ->firstOrFail();
    }

    /**
     * Store an optional uploaded image and remove the file it replaces.
     */
    protected function storeUploadedImage(
        Request $request,
        string $field,
        string $directory,
        ?string $oldPath = null,
    ): ?string {
        $file = $request->file($field);

        if (! $file instanceof UploadedFile) {
            return null;
        }

        $newPath = $file->store($directory, 'public');

        if ($oldPath !== null && $oldPath !== $newPath) {
            Storage::disk('public')->delete($oldPath);
        }

        return $newPath;
    }
}
