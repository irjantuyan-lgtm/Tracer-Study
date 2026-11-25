<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        // Cari ID untuk role Superadmin
        $superadminRole = Role::where('nama_role', 'Superadmin')->first();

        User::create([
            'username' => 'superadmin',
            'password' => Hash::make('password123'), // Password yang sudah di-enkripsi
            'role_id' => $superadminRole->id,
            'is_active' => true,
        ]);
    }
}