<?php

// app/Http/Controllers/VoteController.php
namespace App\Http\Controllers;

use App\Models\Vote;
use App\Models\Anecdote;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function store(Request $request, $id)
    {
        $fields = $request->validate([
            'type' => 'required|in:Bof,Excellent,Technique,Wow',
        ]);

        $anecdote = Anecdote::findOrFail($id);
        $user = $request->user();

        $vote = Vote::updateOrCreate(
            [
                'user_id' => $user->id,
                'anecdote_id' => $anecdote->id,
                'type' => $fields['type']
            ],
            []
        );
        return response()->json(['message' => 'Vote pris en compte !']);
    }

    public function destroy(Request $request, $id)
    {
        $fields = $request->validate([
            'type' => 'required|in:Bof,Excellent,Technique,Wow',
        ]);
        $vote = Vote::where('user_id', $request->user()->id)
            ->where('anecdote_id', $id)
            ->where('type', $fields['type'])
            ->first();
        if ($vote) $vote->delete();

        return response()->json(['message' => 'Vote supprimé']);
    }
}
