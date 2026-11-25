<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
{
    protected $table = 'dosen';
    protected $fillable = [
        'user_id', 'prodi_id', 'nidn', 'nama_lengkap', 
        'email', 'no_telepon', 'status_dosen', 'nama_prodi'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'prodi_id');
    }
}