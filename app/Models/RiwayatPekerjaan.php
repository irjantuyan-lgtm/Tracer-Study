<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RiwayatPekerjaan extends Model
{
    protected $table = 'riwayat_pekerjaan';
    protected $fillable = [
        'alumni_id', 'status_pekerjaan', 'nama_instansi_perusahaan', 
        'jabatan', 'urutan_data'
    ];

    public function alumni()
    {
        return $this->belongsTo(Alumni::class);
    }
}