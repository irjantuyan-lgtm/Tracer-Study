<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Dosen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class DosenController extends Controller
{
    public function index()
    {
        $query = Dosen::with('programStudi');
        $user = Auth::user();

        if ($user && $user->role && $user->role->nama_role === 'Admin Prodi') {
            $query->where('prodi_id', $user->prodi_id);
        }

        return response()->json(['status' => 'success', 'data' => $query->get()], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'prodi_id' => 'required|exists:program_studi,id',
            'nidn' => 'required|unique:dosen,nidn',
            'nama_lengkap' => 'required|string|max:150'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $user = Auth::user();
        if ($user && $user->role && $user->role->nama_role === 'Admin Prodi' && (int) $request->prodi_id !== (int) $user->prodi_id) {
            return response()->json(['message' => 'Anda hanya boleh menambah dosen pada program studi Anda sendiri'], 403);
        }

        $dosen = Dosen::create($request->all());
        \App\Models\AuditLog::catat('Menambah dosen', 'dosen', $dosen->id);
        return response()->json(['status' => 'success', 'message' => 'Dosen berhasil ditambahkan', 'data' => $dosen], 201);
    }

    // METHOD BARU: Untuk melihat detail satu dosen
    public function show($id)
    {
        $query = Dosen::with('programStudi');
        $user = Auth::user();

        if ($user && $user->role && $user->role->nama_role === 'Admin Prodi') {
            $query->where('prodi_id', $user->prodi_id);
        }

        $dosen = $query->find($id);
        if (!$dosen) return response()->json(['message' => 'Dosen tidak ditemukan'], 404);
        return response()->json(['status' => 'success', 'data' => $dosen], 200);
    }

    // METHOD BARU: Untuk mengubah data dosen
    public function update(Request $request, $id)
    {
        $dosen = Dosen::find($id);
        if (!$dosen) return response()->json(['message' => 'Dosen tidak ditemukan'], 404);

        $user = Auth::user();
        if ($user && $user->role && $user->role->nama_role === 'Admin Prodi' && $dosen->prodi_id != $user->prodi_id) {
            return response()->json(['message' => 'Anda tidak berhak mengubah dosen dari program studi lain'], 403);
        }

        $validator = Validator::make($request->all(), [
            'prodi_id' => 'exists:program_studi,id',
            'nidn' => 'unique:dosen,nidn,' . $id,
            'nama_lengkap' => 'string|max:150'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $dosen->update($request->all());
        \App\Models\AuditLog::catat('Mengubah dosen', 'dosen', $dosen->id);
        return response()->json(['status' => 'success', 'message' => 'Dosen berhasil diupdate', 'data' => $dosen], 200);
    }

    // METHOD BARU: Untuk menghapus data dosen
    public function destroy($id)
    {
        $dosen = Dosen::find($id);
        if (!$dosen) return response()->json(['message' => 'Dosen tidak ditemukan'], 404);

        $user = Auth::user();
        if ($user && $user->role && $user->role->nama_role === 'Admin Prodi' && $dosen->prodi_id != $user->prodi_id) {
            return response()->json(['message' => 'Anda tidak berhak menghapus dosen dari program studi lain'], 403);
        }

        $dosen->delete();
        \App\Models\AuditLog::catat('Menghapus dosen', 'dosen', (int) $id);
        return response()->json(['status' => 'success', 'message' => 'Dosen berhasil dihapus'], 200);
    }
}