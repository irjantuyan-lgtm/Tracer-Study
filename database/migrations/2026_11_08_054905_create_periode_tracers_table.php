<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('periode_tracer', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prodi_id')->constrained('program_studi')->onDelete('cascade');
            $table->string('nama_periode', 150);
            $table->year('tahun_periode');
            $table->foreignId('instrumen_snapshot_id')->constrained('instrumen_template')->onDelete('restrict');
            $table->date('tanggal_mulai');
            $table->date('tanggal_selesai');
            $table->integer('target_responden')->nullable();
            $table->enum('status', ['Draft', 'Aktif', 'Ditutup', 'Diarsipkan'])->default('Draft');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('periode_tracer');
    }
};