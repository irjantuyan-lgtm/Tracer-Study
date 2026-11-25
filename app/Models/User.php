<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'username',
        'password',
        'role_id',
        'prodi_id',
        'is_active',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function programStudi()
    {
        return $this->belongsTo(ProgramStudi::class, 'prodi_id');
    }

    public function dosen()
    {
        return $this->hasOne(Dosen::class);
    }

    public function alumni()
    {
        return $this->hasOne(Alumni::class);
    }
}