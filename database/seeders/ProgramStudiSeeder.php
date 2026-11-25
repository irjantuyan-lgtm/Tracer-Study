<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProgramStudi;

class ProgramStudiSeeder extends Seeder
{
    public function run(): void
    {
        $prodi = [
            ['kode_prodi' => 'IF', 'nama_prodi' => 'Informatika'],
            ['kode_prodi' => 'SI', 'nama_prodi' => 'Sistem Informasi'],
        ];

        foreach ($prodi as $p) {
            ProgramStudi::create($p);
        }
    }
}