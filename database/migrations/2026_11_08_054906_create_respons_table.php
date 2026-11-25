<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('respons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('periode_id')->constrained('periode_tracer')->onDelete('cascade');
            $table->foreignId('alumni_id')->constrained('alumni')->onDelete('cascade');
            $table->enum('status_pengisian', ['Draft', 'Terkirim'])->default('Draft');
            $table->dateTime('waktu_kirim')->nullable();
            $table->timestamps();
            
            $table->unique(['periode_id', 'alumni_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('respons');
    }
};