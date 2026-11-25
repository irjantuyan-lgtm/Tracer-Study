<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PeriodeTracerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_periode' => $this->nama_periode,
            'tahun' => $this->tahun_periode,
            'jadwal' => [
                'mulai' => $this->tanggal_mulai,
                'selesai' => $this->tanggal_selesai,
            ],
            'target_responden' => $this->target_responden,
            'status' => $this->status,
            'program_studi' => $this->whenLoaded('programStudi', function() {
                return $this->programStudi->nama_prodi;
            }),
        ];
    }
}