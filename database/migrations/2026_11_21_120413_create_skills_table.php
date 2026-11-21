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
        Schema::create('skills', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('portfolio_profile_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('category');
            $table->string('level');
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
        Schema::dropIfExists('skills');
    }
};
