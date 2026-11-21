<?php

namespace App\Models;

use Database\Factories\ExperienceFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'portfolio_profile_id',
    'eyebrow',
    'title',
    'description',
    'icon',
    'sort_order',
])]
class Experience extends Model
{
    /** @use HasFactory<ExperienceFactory> */
    use HasFactory;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'sort_order' => 'integer',
        ];
    }

    /**
     * Get the portfolio profile that owns this experience.
     */
    public function portfolioProfile(): BelongsTo
    {
        return $this->belongsTo(PortfolioProfile::class);
    }

    /**
     * Order experiences by their configured display position.
     */
    #[Scope]
    protected function ordered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Convert the experience to the shape used by the public portfolio.
     *
     * @return array<string, mixed>
     */
    public function toPortfolioArray(): array
    {
        return [
            'id' => $this->id,
            'eyebrow' => $this->eyebrow,
            'title' => $this->title,
            'description' => $this->description,
            'icon' => $this->icon,
            'sort_order' => $this->sort_order,
        ];
    }
}
