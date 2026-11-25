<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResponsTracerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status_pengisian' => $this->status_pengisian,
            'waktu_kirim' => $this->waktu_kirim,
            'alumni' => new AlumniProfileResource($this->whenLoaded('alumni')),
            'periode' => new PeriodeTracerResource($this->whenLoaded('periode')),
        ];
    }
}