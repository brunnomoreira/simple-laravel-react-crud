<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\UnauthorizedException;

class RoleMiddleware
{
    public function handle($request, Closure $next, $role, $guard = null)
    {
        $authGuard = Auth::guard($guard);

        if ($authGuard->guest()) {
            throw new UnauthorizedException("You have not permission to access this resource");
        }

        $roles = is_array($role)
            ? $role
            : explode('|', $role);

        if (!in_array($authGuard->user()->role, $roles)) {
            throw new UnauthorizedException("You have not permission to access this resource");
        }

        return $next($request);
    }
}