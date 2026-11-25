<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\PeriodeTracer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\AuditLog;

class PeriodeTracerController extends Controller
{
    public function index()
    {
        $periode = PeriodeTracer::with(['programStudi', 'instrumenSnapshot'])->get();
        return response()->json(['status' => 'success', 'data' => $periode], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prodi_id' => 'required|exists:program_studi,id', // Tambahan Validasi Wajib
            'instrumen_snapshot_id' => 'required|exists:instrumen_template,id', // Tambahan Validasi Wajib
            'nama_periode' => 'required|string|max:150',
            'tahun_periode' => 'required|integer',
            'tanggal_mulai' => 'required|date',
            'tanggal_selesai' => 'required|date|after_or_equal:tanggal_mulai',
            'status' => 'required|in:Draft,Aktif,Ditutup,Diarsipkan' // Disesuaikan dengan Enum Database
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        // Jika periode baru diset 'Aktif', matikan periode lama menjadi 'Ditutup' (bukan Selesai)
        if ($request->status === 'Aktif') {
            PeriodeTracer::where('status', 'Aktif')->update(['status' => 'Ditutup']);
        }

        $periode = PeriodeTracer::create($request->all());
        return response()->json(['status' => 'success', 'message' => 'Periode berhasil dibuat', 'data' => $periode], 201);
    }

    public function show($id)
    {
        $periode = PeriodeTracer::with('instrumenSnapshot')->find($id);
        if (!$periode) return response()->json(['message' => 'Periode tidak ditemukan'], 404);
        return response()->json(['status' => 'success', 'data' => $periode], 200);
    }

    public function ubahStatus(Request $request, $periode_id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:Draft,Aktif,Ditutup,Diarsipkan' // Disesuaikan dengan Enum Database
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $periode = PeriodeTracer::find($periode_id);
        if (!$periode) return response()->json(['message' => 'Periode tidak ditemukan'], 404);

        if ($request->status === 'Aktif') {
            PeriodeTracer::where('id', '!=', $periode_id)->where('status', 'Aktif')->update(['status' => 'Ditutup']);
        }

        $periode->update(['status' => $request->status]);

        // Catat perubahan status ke AuditLog
        AuditLog::catat("Mengubah status periode menjadi {$request->status}", 'periode_tracer', $periode->id);
        
        return response()->json([
            'status' => 'success', 
            'message' => "Status periode berhasil diubah menjadi {$request->status}", 
            'data' => $periode
        ], 200);
    }

    // --- METHOD BARU: Untuk mengubah data periode (selain status) ---
    public function update(Request $request, $id)
    {
        $periode = PeriodeTracer::find($id);
        if (!$periode) return response()->json(['message' => 'Periode tidak ditemukan'], 404);

        $validator = Validator::make($request->all(), [
            'prodi_id' => 'exists:program_studi,id',
            'instrumen_snapshot_id' => 'exists:instrumen_template,id',
            'nama_periode' => 'string|max:150',
            'tahun_periode' => 'integer',
            'tanggal_mulai' => 'date',
            'tanggal_selesai' => 'date|after_or_equal:tanggal_mulai',
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $periode->update($request->all());
        
        // Memanggil fungsi pencatat log
        AuditLog::catat("Mengubah data detail periode '{$periode->nama_periode}'", 'periode_tracer', $periode->id);

        return response()->json([
            'status' => 'success', 
            'message' => 'Data periode berhasil diupdate', 
            'data' => $periode
        ], 200);
    }

    // --- METHOD BARU: Untuk menghapus data periode ---
    public function destroy($id)
    {
        $periode = PeriodeTracer::find($id);
        if (!$periode) return response()->json(['message' => 'Periode tidak ditemukan'], 404);

        $namaPeriode = $periode->nama_periode; // Simpan nama sebelum dihapus untuk log
        
        // Mencatat aktivitas penghapusan ke log SEBELUM data dihapus dari database
        AuditLog::catat("Menghapus periode '{$namaPeriode}'", 'periode_tracer', $id);
        
        $periode->delete();

        return response()->json([
            'status' => 'success', 
            'message' => 'Periode berhasil dihapus secara permanen'
        ], 200);
    }
}