<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function store(Request $request)
    {
        $this->validate($request, [
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        /** @var User $user */
        $user = User::where('email', $request->email)->first();

        if ($user and Hash::check($request->input('password'), $user->password)) {
            $token = $user->createToken('my-app-token')->accessToken;

            return UserResource::make($user)->additional(['token' => $token]);
        }

        return response()->json([
            'errors' => [
                'email' => ['These credentials do not match our records.'],
            ]
        ], 422);
    }

    public function destroy(Request $request)
    {
        $request->user()->token()->revoke();

        return response()->json(null, 204);
    }
}