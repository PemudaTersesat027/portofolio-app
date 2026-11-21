<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('portfolio_profile_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->string('category');
            $table->text('description');
            $table->string('image_path')->nullable();
            $table->string('external_image_url')->nullable();
            $table->string('version')->nullable();
            $table->string('development_status')->default('development');
            $table->string('source_type')->default('closed-source');
            $table->string('sales_status')->default('not-for-sale');
            $table->json('tags')->nullable();
            $table->unsignedInteger('price')->nullable();
            $table->unsignedInteger('preorder_price')->nullable();
            $table->date('preorder_deadline')->nullable();
            $table->unsignedInteger('preorder_limit')->nullable();
            $table->unsignedInteger('preorder_sold')->default(0);
            $table->string('purchase_url')->nullable();
            $table->string('live_url')->nullable();
            $table->string('trial_url')->nullable();
            $table->string('github_url')->nullable();
            $table->unsignedInteger('sort_order')->default(0);
            $table->timestamps();

            $table->index(['portfolio_profile_id', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
