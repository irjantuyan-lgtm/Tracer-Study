<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('permohonan_revisi', function (Blueprint $table) {
            $table->id();
            $table->foreignId('respons_id')->constrained('respons')->onDelete('cascade');
            $table->text('alasan_perubahan');
            $table->enum('status_permohonan', ['Menunggu Tinjauan', 'Disetujui', 'Ditolak', 'Selesai'])->default('Menunggu Tinjauan');
            $table->foreignId('ditinjau_oleh')->nullable()->constrained('users')->onDelete('set null');
            $table->dateTime('waktu_pengajuan')->useCurrent();
            $table->dateTime('waktu_keputusan')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('permohonan_revisi');
    }
};