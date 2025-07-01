<?php

// app/Http/Middleware/IsAdmin.php
namespace App\Http\Middleware;

use Closure;

class IsAdmin
{
    public function handle($request, Closure $next)
    {
        if (auth()->user() && auth()->user()->role === 'admin') {
            return $next($request);
        }
        return response()->json(['error' => 'Unauthorized'], 403);
    }
}

