<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('riwayat_pekerjaan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumni_id')->constrained('alumni')->onDelete('cascade');
            $table->enum('status_pekerjaan', ['Swasta', 'Wiraswasta', 'ASN']);
            $table->string('nama_instansi_perusahaan', 150);
            $table->string('jabatan', 100)->nullable();
            $table->integer('urutan_data')->comment('Maksimal 2 data');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('riwayat_pekerjaan');
    }
};