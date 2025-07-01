<?php

// app/Http/Controllers/AnecdoteController.php
namespace App\Http\Controllers;

use App\Models\Anecdote;
use Illuminate\Http\Request;

class AnecdoteController extends Controller
{
    public function index(Request $request)
    {
        $query = Anecdote::with('user', 'votes');

        if ($request->has('category')) {
            $query->where('category', $request->category);
        }
        $anecdotes = $query->orderBy('created_at', 'desc')->paginate(10);

        return response()->json($anecdotes);
    }

    public function show($id)
    {
        $anecdote = Anecdote::with('user', 'votes')->findOrFail($id);
        return response()->json($anecdote);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => 'required|max:255',
            'category' => 'required|in:Histoire,Humour,Vie quotidienne,Échec,Succès',
            'content' => 'required|max:500'
        ]);
        $anecdote = Anecdote::create([
            'user_id' => $request->user()->id,
            'title' => $fields['title'],
            'category' => $fields['category'],
            'content' => $fields['content'],
        ]);
        return response()->json($anecdote, 201);
    }

    public function destroy($id)
    {
        $anecdote = Anecdote::findOrFail($id);

        if (auth()->user()->id !== $anecdote->user_id && auth()->user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        $anecdote->delete();
        return response()->json(['message' => 'Anecdote supprimée.']);
    }
}

