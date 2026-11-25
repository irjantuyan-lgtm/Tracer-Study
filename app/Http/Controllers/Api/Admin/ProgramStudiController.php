<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\ProgramStudi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class ProgramStudiController extends Controller
{
    public function index()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('role');
        
        // Jika dia Admin Prodi, HANYA tampilkan data prodinya sendiri
        if ($user->role->nama_role === 'Admin Prodi') {
            $prodi = ProgramStudi::where('id', $user->prodi_id)->get();
        } else {
            // Superadmin & Admin Fakultas bisa melihat semua prodi
            $prodi = ProgramStudi::all();
        }

        return response()->json(['status' => 'success', 'data' => $prodi], 200);
    }

    public function store(Request $request)
    {
        // Hanya Superadmin & Admin Fakultas yang boleh membuat Prodi baru
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('role');

        if ($user->role->nama_role === 'Admin Prodi') {
            return response()->json(['message' => 'Akses ditolak. Admin Prodi tidak diizinkan membuat Program Studi baru.'], 403);
        }

        $validator = Validator::make($request->all(), [
            'kode_prodi' => 'required|unique:program_studi,kode_prodi',
            'nama_prodi' => 'required|string|max:150',
            'jenjang' => 'required|string|max:50'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $prodi = ProgramStudi::create($request->all());
        return response()->json(['status' => 'success', 'message' => 'Prodi berhasil ditambahkan', 'data' => $prodi], 201);
    }

    public function show($id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('role');
        
        // Cek jika Admin Prodi mencoba melihat prodi lain
        if ($user->role->nama_role === 'Admin Prodi' && $user->prodi_id != $id) {
            return response()->json(['message' => 'Akses ditolak. Anda hanya bisa melihat Program Studi Anda sendiri.'], 403);
        }

        $prodi = ProgramStudi::find($id);
        if (!$prodi) return response()->json(['message' => 'Program Studi tidak ditemukan'], 404);
        
        return response()->json(['status' => 'success', 'data' => $prodi], 200);
    }

    public function update(Request $request, $id)
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('role');
        
        // Cek jika Admin Prodi mencoba mengubah prodi lain
        if ($user->role->nama_role === 'Admin Prodi' && $user->prodi_id != $id) {
            return response()->json(['message' => 'Akses ditolak. Anda tidak berhak mengubah Program Studi ini.'], 403);
        }

        $prodi = ProgramStudi::find($id);
        if (!$prodi) return response()->json(['message' => 'Program Studi tidak ditemukan'], 404);

        $validator = Validator::make($request->all(), [
            'kode_prodi' => 'unique:program_studi,kode_prodi,' . $id,
            'nama_prodi' => 'string|max:150',
            'jenjang' => 'string|max:50'
        ]);

        if ($validator->fails()) return response()->json(['errors' => $validator->errors()], 422);

        $prodi->update($request->all());
        return response()->json(['status' => 'success', 'message' => 'Prodi berhasil diupdate', 'data' => $prodi], 200);
    }

    public function destroy($id)
    {
        // Hanya Superadmin & Admin Fakultas yang boleh menghapus Prodi
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user->load('role');

        if ($user->role->nama_role === 'Admin Prodi') {
            return response()->json(['message' => 'Akses ditolak. Admin Prodi tidak memiliki izin untuk menghapus Program Studi.'], 403);
        }

        $prodi = ProgramStudi::find($id);
        if (!$prodi) return response()->json(['message' => 'Program Studi tidak ditemukan'], 404);

        $prodi->delete();
        return response()->json(['status' => 'success', 'message' => 'Prodi berhasil dihapus'], 200);
    }
}