<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    /**
     * Reset a user's password to a default value.
     */
    public function reset(Request $request, User $user)
    {
        // Check if the authenticated user has permission to reset passwords
        if (!$request->user()->can('reset student password')) {
            return redirect()->back()->with('error', 'You do not have permission to reset passwords.');
        }

        // Generate a random password or use a default one
        $defaultPassword = 'password';

        // Update the user's password
        $user->update([
            'password' => Hash::make($defaultPassword),
            'has_change_password' => false,
        ]);

        return redirect()->back()->with('success', "Password has been reset to '{$defaultPassword}'");
    }
}
