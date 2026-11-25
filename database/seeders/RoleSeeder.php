<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            'Superadmin',
            'Admin Fakultas',
            'Admin Prodi',
            'Alumni'
        ];

        foreach ($roles as $role) {
            // Menggunakan firstOrCreate agar tidak error duplikat jika seeder dijalankan ulang
            Role::firstOrCreate(['nama_role' => $role]);
        }
    }
}