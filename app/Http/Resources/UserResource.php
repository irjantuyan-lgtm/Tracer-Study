<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'username' => $this->username,
            'is_active' => (bool) $this->is_active,
            // Memanggil relasi secara rapi tanpa menumpuk
            'role' => $this->whenLoaded('role', function() {
                return $this->role->nama_role;
            }),
            'program_studi' => $this->whenLoaded('programStudi', function() {
                return [
                    'id' => $this->programStudi->id,
                    'nama_prodi' => $this->programStudi->nama_prodi,
                ];
            }),
            'terdaftar_pada' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
        ];
    }
}