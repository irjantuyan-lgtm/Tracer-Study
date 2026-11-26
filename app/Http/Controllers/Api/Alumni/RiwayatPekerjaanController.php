<?php

namespace App\Http\Controllers\Api\Alumni;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\RiwayatPekerjaan;
use App\Models\Alumni;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RiwayatPekerjaanController extends Controller
{
    public function index()
    {
        $alumni = Alumni::where('user_id', Auth::id())->first();
        if (!$alumni) return response()->json(['message' => 'Data alumni tidak ditemukan'], 404);

        $riwayat = RiwayatPekerjaan::where('alumni_id', $alumni->id)->orderBy('urutan_data', 'asc')->get();
        return response()->json(['status' => 'success', 'data' => $riwayat], 200);
    }

    public function store(Request $request)
    {
        $alumni = Alumni::where('user_id', Auth::id())->first();
        if (!$alumni) return response()->json(['status' => 'error', 'message' => 'Profil alumni tidak ditemukan'], 404);

        // Cek batasan maksimal 2 data
        $jumlahData = RiwayatPekerjaan::where('alumni_id', $alumni->id)->count();
        if ($jumlahData >= 2) {
            return response()->json(['status' => 'error', 'message' => 'Maksimal hanya bisa menambahkan 2 riwayat pekerjaan'], 400);
        }

        $validator = Validator::make($request->all(), [
            'status_pekerjaan' => 'required|in:Swasta,Wiraswasta,ASN',
            'nama_instansi_perusahaan' => 'required|string|max:150',
            'jabatan' => 'nullable|string|max:100',
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $data = $request->all();
        $data['alumni_id'] = $alumni->id;
        $data['urutan_data'] = $jumlahData + 1;

        $pekerjaan = RiwayatPekerjaan::create($data);
        return response()->json(['status' => 'success', 'message' => 'Riwayat pekerjaan ditambahkan', 'data' => $pekerjaan], 201);
    }

    public function destroy($id)
    {
        $pekerjaan = RiwayatPekerjaan::where('id', $id)->whereHas('alumni', function($q) {
            $q->where('user_id', Auth::id());
        })->first();

        if (!$pekerjaan) return response()->json(['message' => 'Data tidak ditemukan atau bukan milik Anda'], 404);

        $pekerjaan->delete();
        return response()->json(['status' => 'success', 'message' => 'Riwayat pekerjaan dihapus'], 200);
    }
}