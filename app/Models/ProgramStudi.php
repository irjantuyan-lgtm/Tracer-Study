<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProgramStudi extends Model
{
    protected $table = 'program_studi';
    protected $fillable = ['kode_prodi', 'nama_prodi'];

    public function users()
    {
        return $this->hasMany(User::class, 'prodi_id');
    }

    public function dosen()
    {
        return $this->hasMany(Dosen::class, 'prodi_id');
    }

    public function alumni()
    {
        return $this->hasMany(Alumni::class, 'prodi_id');
    }
}