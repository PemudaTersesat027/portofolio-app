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
        Schema::create('portfolio_profiles', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('role');
            $table->string('location');
            $table->string('email');
            $table->text('description');
            $table->string('github_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->text('about');
            $table->string('avatar_path');
            $table->string('hero_image_path');
            $table->timestamp('setup_completed_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_profiles');
    }
};
