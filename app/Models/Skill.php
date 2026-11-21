<?php

namespace App\Models;

use Database\Factories\SkillFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'portfolio_profile_id',
    'name',
    'category',
    'level',
    'sort_order',
])]
class Skill extends Model
{
    /** @use HasFactory<SkillFactory> */
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
     * Get the portfolio profile that owns this skill.
     */
    public function portfolioProfile(): BelongsTo
    {
        return $this->belongsTo(PortfolioProfile::class);
    }

    /**
     * Order skills by their configured display position.
     */
    #[Scope]
    protected function ordered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Convert the skill to the shape used by the public portfolio.
     *
     * @return array<string, mixed>
     */
    public function toPortfolioArray(): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'category' => $this->category,
            'level' => $this->level,
            'sort_order' => $this->sort_order,
        ];
    }
}
