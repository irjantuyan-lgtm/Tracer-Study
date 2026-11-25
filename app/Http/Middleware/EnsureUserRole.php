<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        // 1. Pastikan user sudah login dan punya role
        if (!$user || !$user->role) {
            return response()->json(['status' => 'error', 'message' => 'Akses ditolak. Anda belum login.'], 401);
        }

        $nama_role = $user->role->nama_role;

        // 2. Superadmin selalu diizinkan mengakses apapun
        if ($nama_role === 'Superadmin') {
            return $next($request);
        }

        // 3. Admin Fakultas dibatasi HANYA untuk method GET (View Only) jika mereka mengakses route yang butuh hak akses tinggi
        if ($nama_role === 'Admin Fakultas' && !in_array($request->method(), ['GET', 'OPTIONS'])) {
            return response()->json([
                'status' => 'error', 
                'message' => 'Akses ditolak. Admin Fakultas hanya memiliki akses Lihat (View-Only).'
            ], 403);
        }

        // 4. Cek apakah role user ada di dalam daftar role yang diizinkan di route
        if (!empty($roles) && !in_array($nama_role, $roles)) {
            return response()->json([
                'status' => 'error', 
                'message' => 'Akses ditolak. Role Anda tidak memiliki izin untuk fitur ini.'
            ], 403);
        }

        return $next($request);
    }
}