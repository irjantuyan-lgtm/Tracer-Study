<?php

namespace App\Http\Controllers\Api\Alumni;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PeriodeTracer;
use App\Models\Respons;
use App\Models\JawabanDetail;
use App\Models\Pertanyaan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Exception;

class KuesionerSubmissionController extends Controller
{
    // --- METHOD BARU: Untuk Mengambil Soal Kuesioner (Temuan Audit No. 2) ---
    public function getSoal()
    {
        // Cari periode aktif
        $periode = PeriodeTracer::where('status', 'Aktif')->first();
        if (!$periode) {
            return response()->json(['message' => 'Tidak ada periode kuesioner yang aktif saat ini.'], 404);
        }

        // Ambil daftar pertanyaan berdasarkan instrumen snapshot periode aktif
        $pertanyaan = Pertanyaan::where('instrumen_id', $periode->instrumen_snapshot_id)->get();
        
        return response()->json(['status' => 'success', 'data' => $pertanyaan], 200);
    }

    // --- METHOD SUBMIT JAWABAN ---
    public function submitJawaban(Request $request)
    {
       // 1. Cek Profil Alumni 
        /** @var \App\Models\User $user */ 
        $user = Auth::user();
        $user->load('alumni'); 
        
        if (!$user->alumni) {
            return response()->json(['message' => 'Profil Alumni tidak ditemukan. Harap lengkapi biodata Anda pada Admin.'], 403);
        }
        $alumni_id = $user->alumni->id;

        // 2. Cek Ketersediaan Periode Aktif
        $periode = PeriodeTracer::where('status', 'Aktif')->first();
        if (!$periode) {
            return response()->json(['message' => 'Tidak ada periode kuesioner yang aktif saat ini.'], 404);
        }

        // 3. Cek Status Pengisian Sebelumnya (Menutup celah overwrite ilegal)
        $respons = Respons::where('alumni_id', $alumni_id)
                          ->where('periode_id', $periode->id)
                          ->first();

        // Jika sudah 'Terkirim', tolak pengiriman ulang kecuali statusnya 'Draft' (karena revisi disetujui)
        if ($respons && $respons->status_pengisian === 'Terkirim') {
            return response()->json(['message' => 'Anda sudah mengirimkan kuesioner ini. Jika ingin mengubah jawaban, silakan ajukan permohonan revisi.'], 403);
        }

        // 4. Validasi Format Input
        $validator = Validator::make($request->all(), [
            'jawaban' => 'required|array',
            'jawaban.*.pertanyaan_id' => 'required|exists:pertanyaan,id',
            'jawaban.*.teks_jawaban' => 'required'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        // 5. Validasi Kepemilikan Pertanyaan (Menutup celah manipulasi ID Pertanyaan)
        $pertanyaanIds = collect($request->jawaban)->pluck('pertanyaan_id')->toArray();
        $validPertanyaanCount = Pertanyaan::whereIn('id', $pertanyaanIds)
                                  ->where('instrumen_id', $periode->instrumen_snapshot_id)
                                  ->count();

        // Pastikan jumlah pertanyaan yang dijawab sama persis dengan yang ada di instrumen aktif
        if ($validPertanyaanCount !== count($pertanyaanIds)) {
            return response()->json(['message' => 'Terdapat pertanyaan tidak valid atau tidak berasal dari instrumen kuesioner saat ini.'], 422);
        }

        // --- TAMBAHAN BARU: 5B. Validasi Pertanyaan Wajib (Menutup Temuan No. 7) ---
        // Catatan: Pastikan kolom di tabel pertanyaan bernama 'is_required'. Jika di database Anda namanya 'wajib', silakan ubah kata 'is_required' di bawah ini menjadi 'wajib'.
        $pertanyaanWajibIds = Pertanyaan::where('instrumen_id', $periode->instrumen_snapshot_id)
                                        ->where('is_wajib', true) 
                                        ->pluck('id')
                                        ->toArray();

        // Cari ID pertanyaan wajib yang TIDAK ADA di dalam jawaban user
        $belumDijawab = array_diff($pertanyaanWajibIds, $pertanyaanIds);

        if (count($belumDijawab) > 0) {
            return response()->json([
                'message' => 'Gagal submit. Ada pertanyaan wajib yang belum Anda jawab!',
                'pertanyaan_belum_dijawab' => array_values($belumDijawab)
            ], 422);
        }
        // ---------------------------------------------------------------------------

        // 6. Simpan Jawaban dengan Transaksi Aman
        DB::beginTransaction();
        try {
            if (!$respons) {
                // Buat respons baru jika belum pernah mengisi sama sekali
                $respons = Respons::create([
                    'alumni_id' => $alumni_id,
                    'periode_id' => $periode->id,
                    'status_pengisian' => 'Terkirim',
                    'waktu_kirim' => now() // <-- SUDAH DIUBAH DARI 'tanggal_isi' (Temuan Audit No. 6)
                ]);
            } else {
                // Update ke Terkirim jika sebelumnya berstatus Draft (misal dari hasil revisi)
                $respons->update([
                    'status_pengisian' => 'Terkirim',
                    'waktu_kirim' => now() // <-- SUDAH DIUBAH DARI 'tanggal_isi' (Temuan Audit No. 6)
                ]);
                // Hapus jawaban lama karena akan ditimpa yang baru
                JawabanDetail::where('respons_id', $respons->id)->delete();
            }

            // Siapkan dan simpan jawaban baru secara massal
            $dataJawaban = [];
            foreach ($request->jawaban as $j) {
                $dataJawaban[] = [
                    'respons_id' => $respons->id,
                    'pertanyaan_id' => $j['pertanyaan_id'],
                    'teks_jawaban' => is_array($j['teks_jawaban']) ? json_encode($j['teks_jawaban']) : $j['teks_jawaban'],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            JawabanDetail::insert($dataJawaban);

            DB::commit();
            return response()->json(['status' => 'success', 'message' => 'Terima kasih, kuesioner berhasil dikirim!'], 200);

        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['status' => 'error', 'message' => 'Gagal menyimpan jawaban.', 'error_detail' => $e->getMessage()], 500);
        }
    }
}