<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Anecdote extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'category',
        'content',
        'user_id', // l'auteur de l'anecdote
    ];

    // L'auteur de l'anecdote
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Tous les votes sur l'anecdote
    public function votes()
    {
        return $this->hasMany(Vote::class);
    }
}
