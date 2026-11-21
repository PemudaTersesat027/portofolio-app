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
        Schema::create('experiences', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('portfolio_profile_id')->constrained()->cascadeOnDelete();
            $table->string('eyebrow');
            $table->string('title');
            $table->text('description');
            $table->string('icon')->default('Code2');
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
        Schema::dropIfExists('experiences');
    }
};
