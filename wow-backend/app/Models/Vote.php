<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vote extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'anecdote_id',
        'type', // "Wow" ou "Bof"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function anecdote()
    {
        return $this->belongsTo(Anecdote::class);
    }
}
