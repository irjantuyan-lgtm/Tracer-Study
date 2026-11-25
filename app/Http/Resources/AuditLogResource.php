<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AuditLogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'aksi' => $this->aksi,
            'tabel_terkait' => $this->tabel_referensi,
            'id_terkait' => $this->id_referensi,
            'waktu' => $this->waktu_aktivitas,
            'ip_address' => $this->ip_address,
            'user' => $this->whenLoaded('user', function() {
                return $this->user->username;
            }),
        ];
    }
}