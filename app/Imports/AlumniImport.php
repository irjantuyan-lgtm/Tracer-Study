<?php

namespace App\Imports;

use App\Models\Alumni;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB; // Tambahan import DB
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Exception; // Tambahan import Exception

class AlumniImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // 1. Pengecekan Duplikat (Mencegah error jika data sudah pernah di-import)
        $userExists = User::where('username', $row['email'])->exists();
        $alumniExists = Alumni::where('nim', $row['nim'])->exists();

        if ($userExists || $alumniExists) {
            return null; 
        }

        // Memulai Transaksi Database
        DB::beginTransaction();

        try {
            // 2. Buat Akun User untuk Login
            $user = User::create([
                'username'  => $row['email'],
                'password'  => Hash::make($row['nim']),
                'role_id'   => null,
                'is_active' => true,
            ]);

            // 3. Simpan Biodata Alumni secara manual di dalam transaksi
            Alumni::create([
                'user_id'      => $user->id,
                'prodi_id'     => $row['prodi_id'],
                'nim'          => $row['nim'],
                'nama_lengkap' => $row['nama_lengkap'],
                'tahun_lulus'  => $row['tahun_lulus'],
                'email_kontak' => $row['email'],
            ]);

            // Jika kedua data berhasil dibuat, simpan permanen
            DB::commit();
            
            // Return null karena data alumni sudah disave secara manual menggunakan Alumni::create
            return null;

        } catch (Exception $e) {
            // Jika terjadi error pada baris ini, batalkan pembuatan User agar tidak ada data hantu
            DB::rollBack();
            
            // Melewati baris yang error dan lanjut membaca baris Excel berikutnya
            return null; 
        }
    }
}