<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PermohonanRevisiResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'alasan' => $this->alasan_perubahan,
            'status' => $this->status_permohonan,
            'waktu_pengajuan' => $this->waktu_pengajuan,
            'waktu_keputusan' => $this->waktu_keputusan,
            // Memanggil relasi respons untuk tahu ini revisi kuesioner siapa
            'respons_kuesioner' => new ResponsTracerResource($this->whenLoaded('respons')),
        ];
    }
}