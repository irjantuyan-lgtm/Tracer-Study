<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PeriodeTracer extends Model
{
    protected $table = 'periode_tracer';
    protected $fillable = [
        'prodi_id', 'nama_periode', 'tahun_periode', 'instrumen_snapshot_id',
        'tanggal_mulai', 'tanggal_selesai', 'target_responden', 'status'
    ];

    protected $casts = [
        'tanggal_mulai' => 'date',
        'tanggal_selesai' => 'date',
    ];

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'prodi_id');
    }

    public function instrumenSnapshot()
    {
        return $this->belongsTo(InstrumenTemplate::class, 'instrumen_snapshot_id');
    }

    public function respons()
    {
        return $this->hasMany(Respons::class, 'periode_id');
    }
}