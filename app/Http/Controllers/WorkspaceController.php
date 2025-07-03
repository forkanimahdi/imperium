<?php

namespace App\Http\Controllers;

use App\Models\Workspace;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class WorkspaceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $workspaces = Workspace::where("user_id" , Auth::id())->get();
        return Inertia::render("workspaces/index" , [
            "workspaces"=> $workspaces
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }
    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        request()->validate([
            "name" => "required",
            "description" => "required",
        ]);

        Workspace::create([
            "name" => $request->name,
            "description" => $request->description,
            "user_id" => Auth::id(),
        ]);
        
        // dd("n,");
        return back()->with('success', 'workspace created successfully!');
        }

    /**
     * Display the specified resource.
     */
    public function show(Workspace $workspace)
    {
        //
        return Inertia::render("workspaces/[id]", [
            "workpace" => $workspace
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workspace $workspace)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Workspace $workspace)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workspace $workspace)
    {
        //
    }
}
