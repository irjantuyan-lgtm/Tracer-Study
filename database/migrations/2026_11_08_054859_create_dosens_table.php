<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dosen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('set null');
            $table->foreignId('prodi_id')->constrained('program_studi')->onDelete('cascade');
            $table->string('nidn', 20)->unique();
            $table->string('nama_lengkap', 150);
            $table->string('email', 100)->nullable();
            $table->string('no_telepon', 20)->nullable();
            $table->enum('status_dosen', ['Aktif', 'Non-Aktif'])->default('Aktif');
            $table->string('nama_prodi', 100)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dosen');
    }
};