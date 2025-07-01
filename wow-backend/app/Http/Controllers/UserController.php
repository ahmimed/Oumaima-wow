<?php

// app/Http/Controllers/UserController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function me(Request $request)
    {
        return response()->json($request->user());
    }

    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role')->get();
        return response()->json($users);
    }
}
