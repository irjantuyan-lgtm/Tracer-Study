<?php

namespace App\Http\Controllers\Api\Alumni;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PeriodeTracer;
use App\Models\Respons;
use App\Models\PermohonanRevisi;
use App\Models\Alumni;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PengajuanRevisiController extends Controller
{
    public function ajukanRevisi(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'alasan_perubahan' => 'required|string|min:10'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $alumni = Alumni::where('user_id', Auth::id())->first();
        if (!$alumni) return response()->json(['status' => 'error', 'message' => 'Profil alumni tidak ditemukan'], 404);

        $periode = PeriodeTracer::where('status', 'Aktif')->first();

        if (!$periode) return response()->json(['status' => 'error', 'message' => 'Periode sudah ditutup.'], 400);

        // Cek respons alumni
        $respons = Respons::where('periode_id', $periode->id)->where('alumni_id', $alumni->id)->first();
        if (!$respons || $respons->status_pengisian !== 'Terkirim') {
            return response()->json(['status' => 'error', 'message' => 'Anda belum mengirim kuesioner atau status masih draft.'], 400);
        }

        // Cek apakah sedang ada permohonan yang berjalan
        $cekPermohonan = PermohonanRevisi::where('respons_id', $respons->id)
                            ->where('status_permohonan', 'Menunggu Tinjauan')
                            ->exists();
        
        if ($cekPermohonan) {
            return response()->json(['status' => 'error', 'message' => 'Anda sudah mengajukan revisi dan sedang menunggu tinjauan admin.'], 400);
        }

        $revisi = PermohonanRevisi::create([
            'respons_id' => $respons->id,
            'alasan_perubahan' => $request->alasan_perubahan,
            'status_permohonan' => 'Menunggu Tinjauan',
            'waktu_pengajuan' => now()
        ]);

        \App\Models\AuditLog::catat('Mengajukan revisi kuesioner', 'permohonan_revisi', $revisi->id);

        return response()->json([
            'status' => 'success', 
            'message' => 'Pengajuan revisi berhasil dikirim ke Admin.', 
            'data' => $revisi
        ], 201);
    }
}