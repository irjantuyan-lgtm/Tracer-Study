<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AlumniProfileResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nim' => $this->nim,
            'nama_lengkap' => $this->nama_lengkap,
            'program_studi' => $this->whenLoaded('programStudi', function() {
                return $this->programStudi->nama_prodi;
            }),
            'angkatan' => $this->tahun_masuk,
            'lulusan' => $this->tahun_lulus,
            'kontak' => [
                'email' => $this->email_kontak,
                'no_telepon' => $this->no_telepon,
            ],
            'sosial_media' => [
                'instagram' => $this->akun_ig,
                'tiktok' => $this->akun_tiktok,
                'linkedin' => $this->akun_linkedin,
            ],
            // Jika foto profil ada, buatkan URL lengkapnya
            'foto_profil' => $this->foto_profil ? asset('storage/' . $this->foto_profil) : null,
            'status_alumni' => $this->status_alumni,
            'pendidikan_lanjutan' => [
                'is_lanjut' => (bool) $this->is_lanjut_studi,
                'detail' => $this->detail_lanjut_studi,
            ],
            'riwayat_pekerjaan' => $this->whenLoaded('riwayatPekerjaan')
        ];
    }
}