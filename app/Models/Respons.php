<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Respons extends Model
{
    protected $table = 'respons';
    protected $fillable = [
        'periode_id', 'alumni_id', 'status_pengisian', 'waktu_kirim'
    ];

    protected $casts = [
        'waktu_kirim' => 'datetime',
    ];

    public function periode()
    {
        return $this->belongsTo(PeriodeTracer::class, 'periode_id');
    }

    public function alumni()
    {
        return $this->belongsTo(Alumni::class, 'alumni_id');
    }

    public function jawabanDetail()
    {
        return $this->hasMany(JawabanDetail::class, 'respons_id');
    }

    public function permohonanRevisi()
    {
        return $this->hasMany(PermohonanRevisi::class, 'respons_id');
    }
}