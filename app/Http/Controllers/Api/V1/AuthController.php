<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
 
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
 
            return new UserResource(auth()->user());
        }
 
        return response()->json(['message' => 'Credenciais inválidas'], JsonResponse::HTTP_BAD_REQUEST);
    }

    public function register(RegisterRequest $request)
    {
        $data = $request->validated();

        $user = User::create(array_merge($data, [
            'password' => Hash::make($data['password']),
            'role' => UserRole::CANDIDATE
        ]));

        Auth::login($user);

        $request->session()->regenerate();
 
        return new UserResource(auth()->user());
    }

    public function logout(Request $request)
    {
        Auth::logout();
    
        $request->session()->invalidate();
    
        $request->session()->regenerateToken();
    
        return response()->json();
    }
}
