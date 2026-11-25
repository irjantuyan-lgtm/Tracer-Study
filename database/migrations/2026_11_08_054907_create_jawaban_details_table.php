<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jawaban_detail', function (Blueprint $table) {
            $table->id();
            $table->foreignId('respons_id')->constrained('respons')->onDelete('cascade');
            $table->foreignId('pertanyaan_id')->constrained('pertanyaan')->onDelete('cascade');
            $table->text('teks_jawaban')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jawaban_detail');
    }
};