<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use App\Http\Resources\AuditLogResource; 

class AuditLogController extends Controller
{
    // Fungsi untuk Superadmin melihat semua riwayat aktivitas
    public function index()
    {
        // Menarik data log beserta siapa usernya, diurutkan dari yang paling baru
        $logs = AuditLog::with('user')->orderBy('waktu_aktivitas', 'desc')->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mengambil riwayat aktivitas sistem',
            // Kita bungkus dengan AuditLogResource agar format datanya rapi jika Anda menggunakan Resource
            'data' => AuditLogResource::collection($logs)
        ], 200);
    }
}