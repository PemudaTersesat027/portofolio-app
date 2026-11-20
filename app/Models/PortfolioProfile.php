<?php

namespace App\Models;

use Database\Factories\PortfolioProfileFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'user_id',
    'name',
    'role',
    'location',
    'email',
    'description',
    'github_url',
    'linkedin_url',
    'about',
    'avatar_path',
    'hero_image_path',
    'setup_completed_at',
])]
class PortfolioProfile extends Model
{
    /** @use HasFactory<PortfolioProfileFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'setup_completed_at' => 'datetime',
        ];
    }

    /**
     * Get the admin user that owns this profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope the query to completed setups.
     */
    #[Scope]
    protected function completed(Builder $query): Builder
    {
        return $query->whereNotNull('setup_completed_at');
    }

    /**
     * Get the initials derived from the profile name.
     */
    protected function initials(): Attribute
    {
        return Attribute::make(
            get: function (): string {
                $initials = collect(explode(' ', $this->name))
                    ->filter()
                    ->map(fn (string $word): string => mb_substr($word, 0, 1))
                    ->take(2)
                    ->implode('');

                return mb_strtoupper($initials);
            },
        );
    }

    /**
     * Get the publicly accessible avatar URL.
     */
    protected function avatarUrl(): Attribute
    {
        return Attribute::make(
            get: fn (): ?string => $this->avatar_path
                ? Storage::disk('public')->url($this->avatar_path)
                : null,
        );
    }

    /**
     * Get the publicly accessible hero image URL.
     */
    protected function heroImageUrl(): Attribute
    {
        return Attribute::make(
            get: fn (): ?string => $this->hero_image_path
                ? Storage::disk('public')->url($this->hero_image_path)
                : null,
        );
    }
}
