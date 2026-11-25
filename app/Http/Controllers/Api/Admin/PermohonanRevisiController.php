<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\PermohonanRevisi;
use App\Models\Respons;

class PermohonanRevisiController extends Controller
{
    // Fungsi untuk Admin melihat daftar permohonan revisi yang masuk
    public function index()
    {
        $query = PermohonanRevisi::query()->with('respons.alumni');
        $user = Auth::user();

        if ($user && $user->role && $user->role->nama_role === 'Admin Prodi') {
            $query->whereHas('respons.alumni', function ($q) use ($user) {
                $q->where('prodi_id', $user->prodi_id);
            });
        }

        $data = $query->get();
        
        return response()->json([
            'status' => 'success',
            'message' => 'Berhasil mengambil daftar permohonan revisi alumni',
            'data' => $data
        ], 200);
    }

    // Fungsi untuk Admin menyetujui atau menolak permohonan
    public function tinjau(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status_permohonan' => 'required|in:Disetujui,Ditolak'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

       $query = PermohonanRevisi::query()->with('respons.alumni');
       $user = Auth::user();

       if ($user && $user->role && $user->role->nama_role === 'Admin Prodi') {
           $query->whereHas('respons.alumni', function ($q) use ($user) {
               $q->where('prodi_id', $user->prodi_id);
           });
       }

       $revisi = $query->find($id);
        if (!$revisi) return response()->json(['message' => 'Permohonan tidak ditemukan'], 404);

        // --- TAMBAHKAN PENGECEKAN INI ---
        if ($revisi->status_permohonan !== 'Menunggu Tinjauan') {
            return response()->json([
                'message' => 'Permohonan ini sudah diproses sebelumnya (Disetujui/Ditolak) dan tidak dapat diubah lagi.'
            ], 422);

            }

        // 1. Update status di tabel permohonan_revisi
        $revisi->update([
            'status_permohonan' => $request->status_permohonan,
            'ditinjau_oleh' => Auth::id(), // Mencatat ID Admin yang memutuskan
            'waktu_keputusan' => now()
        ]);

        // 2. Jika disetujui, buka kembali kuesioner alumni (Ubah ke Draft)
        if ($request->status_permohonan === 'Disetujui') {
            $respons = Respons::find($revisi->respons_id);
            if ($respons) {
                $respons->update(['status_pengisian' => 'Draft']);
            }
        }

        \App\Models\AuditLog::catat("Meninjau permohonan revisi menjadi {$request->status_permohonan}", 'permohonan_revisi', $revisi->id);

        return response()->json([
            'status' => 'success', 
            'message' => "Permohonan revisi berhasil " . $request->status_permohonan,
        ], 200);
    }
}