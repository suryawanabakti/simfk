<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class StudentProfileController extends Controller
{
    /**
     * Display the student's dashboard.
     */
    public function dashboard()
    {
        $user = Auth::user();
        $student = Student::where('user_id', $user->id)->with('user')->firstOrFail();

        return Inertia::render('Student/dashboard', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the student's profile.
     */
    public function edit()
    {
        $user = Auth::user();
        $student = Student::where('user_id', $user->id)->with('user')->firstOrFail();

        return Inertia::render('Student/EditProfile', [
            'student' => $student,
            'jalurOptions' => ['SNMPTN', 'SBMPTN', 'Mandiri', 'INTERNASIONAL'],
            'prodiOptions' => ['Pendidikan Kedokteran', 'Kedokteran Hewan', 'Psikologi'],
            'jkOptions' => ['Laki-laki', 'Perempuan'],
            'agamaOptions' => ['Islam', 'Protestan', 'Hindu', 'Budha', 'Katolik', 'Konghucu', 'Lainnya'],
            'statusHuniOptions' => ['Orang tua', 'Keluarga', 'Kontrak', 'Pondokan'],
            'pendidikanOptions' => ['S3', 'S2', 'S1', 'SMA', 'SMP', 'SD'],
            'golDarahOptions' => ['A', 'B', 'AB', 'O'],
        ]);
    }

    /**
     * Update the student's profile.
     */
    public function update(Request $request, Student $student)
    {
        // Ensure the student belongs to the authenticated user
        if ($student->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'user.name' => 'required|string|max:255',
            'email' => ['required', 'email', Rule::unique('students')->ignore($student->id)],
            'no_test' => 'nullable|string|max:255',
            'jalur_penerimaan' => ['nullable', Rule::in(['SNMPTN', 'SBMPTN', 'Mandiri', 'INTERNASIONAL'])],
            'prodi' => ['nullable', Rule::in(['Pendidikan Kedokteran', 'Kedokteran Hewan', 'Psikologi'])],
            'jk' => ['nullable', Rule::in(['Laki-laki', 'Perempuan'])],
            'agama' => ['nullable', Rule::in(['Islam', 'Protestan', 'Hindu', 'Budha', 'Katolik', 'Konghucu', 'Lainnya'])],
            'agama_ayah' => ['nullable', Rule::in(['Islam', 'Protestan', 'Hindu', 'Budha', 'Katolik', 'Lainnya'])],
            'agama_ibu' => ['nullable', Rule::in(['Islam', 'Protestan', 'Hindu', 'Budha', 'Katolik', 'Lainnya'])],
            'status_huni_rumah' => ['nullable', Rule::in(['Orang tua', 'Keluarga', 'Kontrak', 'Pondokan'])],
            'pendidikan_ayah' => ['nullable', Rule::in(['S3', 'S2', 'S1', 'SMA', 'SMP', 'SD'])],
            'pendidikan_ibu' => ['nullable', Rule::in(['S3', 'S2', 'S1', 'SMA', 'SMP', 'SD'])],
            'pendidikan_wali' => ['nullable', Rule::in(['S3', 'S2', 'S1', 'SMA', 'SMP', 'SD'])],
            'gol_darah' => ['nullable', Rule::in(['A', 'B', 'AB', 'O'])],
            'tgl_lahir' => 'nullable|date',
            'angkatan' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'jml_kakak' => 'nullable|integer|min:0',
            'jml_adik' => 'nullable|integer|min:0',
            'penghasilan_ayah' => 'nullable|integer|min:0',
            'penghasilan_ibu' => 'nullable|integer|min:0',
            'penghasilan_wali' => 'nullable|integer|min:0',
            'daya_listrik' => 'nullable|integer|min:0',
            'thn_masuk' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'thn_lulus' => 'nullable|integer|min:1900|max:' . (date('Y') + 1),
            'jml_mapel' => 'nullable|integer|min:0',
            'nilai' => 'nullable|integer|min:0',
            'no_ijazah' => 'nullable|integer|min:0',
            'tinggi' => 'nullable|integer|min:0|max:300',
            'berat' => 'nullable|integer|min:0|max:500',
            'tekanan_darah' => 'nullable|integer|min:0',
            'photo' => 'nullable|image|max:2048',
        ]);

        DB::beginTransaction();
        try {
            // Update user
            $userData = [
                'name' => $request->user['name'],
            ];

            // Handle photo upload
            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('photos', 'public');
                $userData['photo'] = $path;
            }

            $student->user->update($userData);

            // Update student
            $student->update($request->except('user', 'photo'));

            DB::commit();
            return redirect()->route('student.dashboard')->with('success', 'Your profile has been updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to update student profile: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            return redirect()->back()
                ->with('error', 'Failed to update profile: ' . $e->getMessage())
                ->withErrors(['general' => 'An error occurred while updating your profile.'])
                ->withInput();
        }
    }
}
