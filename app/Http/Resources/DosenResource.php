<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DosenResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nidn' => $this->nidn,
            'nama_lengkap' => $this->nama_lengkap,
            'kontak' => [
                'email' => $this->email,
                'no_telepon' => $this->no_telepon,
            ],
            'program_studi' => $this->whenLoaded('programStudi', function() {
                return $this->programStudi->nama_prodi;
            }),
            'status' => $this->status_dosen,
        ];
    }
}