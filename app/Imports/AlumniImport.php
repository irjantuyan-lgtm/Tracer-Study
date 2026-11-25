<?php

namespace App\Imports;

use App\Models\Alumni;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB; // Tambahan import DB
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Exception;
use App\Models\Role;

class AlumniImport implements ToModel, WithHeadingRow
{
    protected int $imported = 0;
    protected int $skipped = 0;

    public function getImportedCount(): int
    {
        return $this->imported;
    }

    public function getSkippedCount(): int
    {
        return $this->skipped;
    }

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
            $this->skipped++;
            return null;
        }

        // Memulai Transaksi Database
        DB::beginTransaction();

        try {
            // 2. Buat Akun User untuk Login
            $roleAlumni = Role::where('nama_role', 'Alumni')->firstOrFail();

            $user = User::create([
                'username'  => $row['email'],
                'password'  => Hash::make($row['nim']),
                'role_id'   => $roleAlumni->id,
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
            $this->imported++;

            return null;

        } catch (Exception $e) {
            // Jika terjadi error pada baris ini, batalkan pembuatan User agar tidak ada data hantu
            DB::rollBack();
            
            $this->skipped++;
            return null;
        }
    }
}