<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class Alumni extends Model
{
    protected $table = 'alumni';
    protected $fillable = [
        'user_id', 'prodi_id', 'nim', 'nama_lengkap', 'tahun_masuk', 
        'tahun_lulus', 'email_kontak', 'no_telepon', 'status_alumni', 
        'akun_ig', 'akun_tiktok', 'akun_linkedin', 'is_lanjut_studi', 'detail_lanjut_studi', 'foto_profil'
    ];

    protected $casts = [
        'is_lanjut_studi' => 'boolean',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'prodi_id');
    }

    public function riwayatPekerjaan()
    {
        return $this->hasMany(RiwayatPekerjaan::class);
    }

    public function respons()
    {
        return $this->hasMany(Respons::class);
    }
}