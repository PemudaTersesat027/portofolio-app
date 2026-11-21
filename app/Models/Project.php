<?php

namespace App\Models;

use Database\Factories\ProjectFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

#[Fillable([
    'portfolio_profile_id',
    'title',
    'category',
    'description',
    'image_path',
    'external_image_url',
    'version',
    'development_status',
    'source_type',
    'sales_status',
    'tags',
    'price',
    'preorder_price',
    'preorder_deadline',
    'preorder_limit',
    'preorder_sold',
    'purchase_url',
    'live_url',
    'trial_url',
    'github_url',
    'sort_order',
])]
class Project extends Model
{
    /** @use HasFactory<ProjectFactory> */
    use HasFactory;

    /** @var array<int, string> */
    protected $appends = ['image_url'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'tags' => 'array',
            'price' => 'integer',
            'preorder_price' => 'integer',
            'preorder_deadline' => 'date:Y-m-d',
            'preorder_limit' => 'integer',
            'preorder_sold' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    /**
     * Get the portfolio profile that owns this project.
     */
    public function portfolioProfile(): BelongsTo
    {
        return $this->belongsTo(PortfolioProfile::class);
    }

    /**
     * Order projects by their configured display position.
     */
    #[Scope]
    protected function ordered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    /**
     * Get the publicly accessible project image URL.
     */
    protected function imageUrl(): Attribute
    {
        return Attribute::make(
            get: fn (): ?string => $this->image_path
                ? Storage::disk('public')->url($this->image_path)
                : $this->external_image_url,
        );
    }

    /**
     * Convert the project to the shape used by the public portfolio.
     *
     * @return array<string, mixed>
     */
    public function toPortfolioArray(): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category' => $this->category,
            'description' => $this->description,
            'image' => $this->image_url,
            'version' => $this->version,
            'developmentStatus' => $this->development_status,
            'sourceType' => $this->source_type,
            'salesStatus' => $this->sales_status,
            'tags' => $this->tags ?? [],
            'price' => $this->price,
            'preorderPrice' => $this->preorder_price,
            'preorderDeadline' => $this->preorder_deadline?->format('F j, Y'),
            'preorderLimit' => $this->preorder_limit,
            'preorderSold' => $this->preorder_sold,
            'purchaseUrl' => $this->purchase_url,
            'liveUrl' => $this->live_url,
            'trialUrl' => $this->trial_url,
            'githubUrl' => $this->github_url,
        ];
    }
}
