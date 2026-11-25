<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JawabanDetail extends Model
{
    protected $table = 'jawaban_detail';
    protected $fillable = ['respons_id', 'pertanyaan_id', 'teks_jawaban'];

    public function respons()
    {
        return $this->belongsTo(Respons::class, 'respons_id');
    }

    public function pertanyaan()
    {
        return $this->belongsTo(Pertanyaan::class, 'pertanyaan_id');
    }
}