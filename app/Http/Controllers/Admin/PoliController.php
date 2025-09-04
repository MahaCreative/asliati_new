<?php

namespace App\Http\Controllers\Admin;

use App\Events\PoliEvent;
use App\Http\Controllers\Controller;
use App\Models\Poli;
use Illuminate\Http\Request;

class PoliController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $poli = Poli::withCount('dokter')->latest()->get();

        return inertia('Petugas/Poli/Index', compact('poli'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        return inertia('Petugas/Poli/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $attr = $request->validate([

            'prefix' => 'required|string|max:1|unique:polis,prefix,unique:polis,prefix',
            'nama_poli' => 'required|string|min:6|max:50|unique:polis,nama',
            'keterangan' => 'required'
        ]);
        Poli::create([
            'prefix' => $attr['prefix'],
            'nama' => $attr['nama_poli'],
            'keterangan' => $attr['keterangan']

        ]);
        broadcast(new PoliEvent());
        return redirect()->route('petugas.poli.index')->with('success', 'Poli berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        $poli = Poli::find($id);
        broadcast(new PoliEvent());
        return inertia('Petugas/Poli/Form', compact('poli'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $attr = $request->validate([
            'prefix' => 'required|string|max:1|unique:polis,prefix,' . $id,
            'nama_poli' => 'required|string|min:6|max:50|unique:polis,nama,' . $id,
            'keterangan' => 'required',
        ]);
        $poli = Poli::findOrFail($id);
        $poli->update([
            'prefix' => $attr['prefix'],
            'nama' => $attr['nama_poli'],
            'keterangan' => $attr['keterangan']
        ]);
        broadcast(new PoliEvent());
        return redirect()->route('petugas.poli.index')->with('success', 'Poli berhasil ditambahkan');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        broadcast(new PoliEvent());
        $poli = Poli::find($id)->delete();
    }
}
