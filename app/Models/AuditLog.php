<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AuditLog extends Model
{
    use HasFactory;

    protected $table = 'audit_logs'; 
    
    // Disamakan persis dengan migrasi database
    protected $fillable = [
        'user_id',
        'aksi',
        'tabel_referensi',
        'id_referensi',
        'waktu_aktivitas'
    ];

    public $timestamps = false; // Matikan timestamps jika tabel ini hanya memakai 'waktu_aktivitas'

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Fungsi catat disesuaikan dengan struktur baru
    public static function catat($aksi, $tabel_referensi = null, $id_referensi = null)
    {
        if (Auth::check()) {
            return self::create([
                'user_id' => Auth::id(),
                'aksi' => $aksi,
                'tabel_referensi' => $tabel_referensi,
                'id_referensi' => $id_referensi,
                'waktu_aktivitas' => now(),
            ]);
        }
        return null;
    }
}