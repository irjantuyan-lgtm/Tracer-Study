<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DosenController extends Controller
{
    public function index()
    {
        $dosen = Dosen::with('programStudi')->get();
        return response()->json(['status' => 'success', 'data' => $dosen], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prodi_id' => 'required|exists:program_studi,id',
            'nidn' => 'required|unique:dosen,nidn',
            'nama_lengkap' => 'required|string|max:150'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $dosen = Dosen::create($request->all());
        return response()->json(['status' => 'success', 'message' => 'Dosen berhasil ditambahkan', 'data' => $dosen], 201);
    }

    // METHOD BARU: Untuk melihat detail satu dosen
    public function show($id)
    {
        $dosen = Dosen::with('programStudi')->find($id);
        if (!$dosen) return response()->json(['message' => 'Dosen tidak ditemukan'], 404);
        return response()->json(['status' => 'success', 'data' => $dosen], 200);
    }

    // METHOD BARU: Untuk mengubah data dosen
    public function update(Request $request, $id)
    {
        $dosen = Dosen::find($id);
        if (!$dosen) return response()->json(['message' => 'Dosen tidak ditemukan'], 404);

        $validator = Validator::make($request->all(), [
            'prodi_id' => 'exists:program_studi,id',
            'nidn' => 'unique:dosen,nidn,' . $id,
            'nama_lengkap' => 'string|max:150'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $dosen->update($request->all());
        return response()->json(['status' => 'success', 'message' => 'Dosen berhasil diupdate', 'data' => $dosen], 200);
    }

    // METHOD BARU: Untuk menghapus data dosen
    public function destroy($id)
    {
        $dosen = Dosen::find($id);
        if (!$dosen) return response()->json(['message' => 'Dosen tidak ditemukan'], 404);

        $dosen->delete();
        return response()->json(['status' => 'success', 'message' => 'Dosen berhasil dihapus'], 200);
    }
}