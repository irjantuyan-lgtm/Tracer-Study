<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PermohonanRevisi extends Model
{
    protected $table = 'permohonan_revisi';
    protected $fillable = [
        'respons_id', 'alasan_perubahan', 'status_permohonan', 
        'ditinjau_oleh', 'waktu_pengajuan', 'waktu_keputusan'
    ];

    protected $casts = [
        'waktu_pengajuan' => 'datetime',
        'waktu_keputusan' => 'datetime',
    ];

    public function respons()
    {
        return $this->belongsTo(Respons::class, 'respons_id');
    }

    public function reviewer()
    {
        return $this->belongsTo(User::class, 'ditinjau_oleh');
    }
}