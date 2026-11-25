<?php

namespace App\Imports;

use App\Models\Pertanyaan;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
 
class PertanyaanImport implements ToModel, WithHeadingRow
{
    protected $instrumen_id;

    // Menangkap ID Instrumen dari Controller
    public function __construct($instrumen_id)
    {
        $this->instrumen_id = $instrumen_id;
    }

    public function model(array $row)
    {
        // Lewati jika baris teks pertanyaan kosong
        if (!isset($row['teks_pertanyaan']) || empty($row['teks_pertanyaan'])) {
            return null; 
        }

        // Konversi format Pilihan Jawaban dari Excel (misal: "A,B,C") menjadi Array
        $pilihan_jawaban = null;
        if (isset($row['pilihan_jawaban']) && $row['pilihan_jawaban'] != '') {
            $pilihan_jawaban = explode(';', $row['pilihan_jawaban']); 
        }

        return new Pertanyaan([
            'instrumen_id'    => $this->instrumen_id,
            'teks_pertanyaan' => $row['teks_pertanyaan'],
            'tipe_jawaban'    => $row['tipe_jawaban'],
            'pilihan_jawaban' => $pilihan_jawaban,
            // Jika di Excel tulisannya "Ya" atau 1, maka otomatis diset Wajib (true)
            'is_wajib'        => (isset($row['wajib_diisi']) && (strtolower(trim($row['wajib_diisi'])) == 'ya' || $row['wajib_diisi'] == '1')) ? true : false,
            // Jika urutan kosong di Excel, otomatis ditaruh di urutan paling bawah (99)
            'urutan'          => $row['urutan'] ?? 99, 
        ]);
    }
}