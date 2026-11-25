<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pertanyaan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instrumen_id')->constrained('instrumen_template')->onDelete('cascade');
            $table->text('teks_pertanyaan');
            $table->string('tipe_jawaban', 50);
            $table->json('pilihan_jawaban')->nullable();
            $table->boolean('is_wajib')->default(true);
            $table->integer('urutan');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pertanyaan');
    }
};