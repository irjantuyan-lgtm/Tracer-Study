<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\InstrumenTemplate;
use App\Imports\PertanyaanImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Validator;
use Exception;

class KuesionerController extends Controller
{
    // Fungsi untuk mengunggah dan mengimpor file Excel
    public function importSoalExcel(Request $request, $instrumen_id)
    {
        // 1. Cek apakah ID instrumen (kuesioner) valid
        $instrumen = InstrumenTemplate::find($instrumen_id);
        if (!$instrumen) {
            return response()->json(['message' => 'Instrumen kuesioner tidak ditemukan'], 404);
        }

        // 2. Validasi file yang diupload (wajib ada, format excel/csv, max 2MB)
        $validator = Validator::make($request->all(), [
            'file_excel' => 'required|mimes:xlsx,xls,csv|max:2048'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            // 3. Eksekusi proses import menggunakan class PertanyaanImport yang kita buat tadi
            Excel::import(new PertanyaanImport($instrumen_id), $request->file('file_excel'));

            return response()->json([
                'status' => 'success',
                'message' => 'Data pertanyaan kuesioner berhasil diimpor dari Excel!'
            ], 200);

        } catch (Exception $e) {
            // Jika ada error saat membaca excel, tangkap di sini
            return response()->json([
                'status' => 'error',
                'message' => 'Gagal mengimpor data. Pastikan format Excel sesuai template.',
                'error_detail' => $e->getMessage()
            ], 500);
        }
    }
}