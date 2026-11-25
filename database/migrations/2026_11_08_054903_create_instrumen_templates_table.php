<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up(): void
    {
        Schema::create('instrumen_template', function (Blueprint $table) {
            $table->id();
            $table->string('nama_template', 150);
            $table->enum('tipe_pemilik', ['Fakultas', 'Prodi', 'Snapshot']);
            $table->foreignId('prodi_id')->nullable()->constrained('program_studi')->onDelete('cascade');
            
            // Tambahan untuk mencatat Dosen pembuat kuesioner
            $table->foreignId('dosen_id')->nullable()->constrained('dosen')->onDelete('set null');
            
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instrumen_template');
    }
};