<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InstrumenTemplate extends Model
{
    protected $table = 'instrumen_template';
    protected $fillable = ['nama_template', 'tipe_pemilik', 'prodi_id'];

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'prodi_id');
    }

    public function pertanyaan()
    {
        return $this->hasMany(Pertanyaan::class, 'instrumen_id')->orderBy('urutan');
    }
}