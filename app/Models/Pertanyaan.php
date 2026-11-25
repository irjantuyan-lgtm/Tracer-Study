<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pertanyaan extends Model
{
    protected $table = 'pertanyaan';
    protected $fillable = [
        'instrumen_id', 'teks_pertanyaan', 'tipe_jawaban', 
        'pilihan_jawaban', 'is_wajib', 'urutan'
    ];

    protected $casts = [
        'pilihan_jawaban' => 'array', // Otomatis konversi JSON dari DB ke Array PHP
        'is_wajib' => 'boolean',
    ];

    public function instrumen()
    {
        return $this->belongsTo(InstrumenTemplate::class, 'instrumen_id');
    }
}