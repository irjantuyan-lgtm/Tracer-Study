<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('alumni', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('prodi_id')->constrained('program_studi')->onDelete('cascade');
            $table->string('nim', 20)->unique();
            $table->string('nama_lengkap', 150);
            $table->year('tahun_masuk')->nullable();
            $table->year('tahun_lulus')->nullable();
            $table->string('email_kontak', 100)->nullable();
            $table->string('no_telepon', 20)->nullable();
            $table->enum('status_alumni', ['Aktif', 'Non-Aktif'])->default('Aktif');
            $table->string('akun_ig', 100)->nullable();
            $table->string('akun_tiktok', 100)->nullable();
            $table->string('akun_linkedin', 150)->nullable();
            $table->boolean('is_lanjut_studi')->default(false);
            $table->text('detail_lanjut_studi')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('alumni');
    }
};