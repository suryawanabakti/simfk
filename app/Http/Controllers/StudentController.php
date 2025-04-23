<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Log;

class StudentController extends Controller
{
    /**
     * Display a listing of the students.
     */
    public function index(Request $request)
    {
        $students = Student::with('user')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('no_test', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhereHas('user', function ($userQuery) use ($search) {
                            $userQuery->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Students/Index', [
            'students' => $students,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new student.
     */
    public function create()
    {
        return Inertia::render('Students/Create', [
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
     * Store a newly created student in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:students,email',
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
            'username' => 'required|string|max:255|unique:users,username',
            'password' => 'required|string|min:6',
            'photo' => 'nullable|image|max:2048',
        ]);

        DB::beginTransaction();
        try {
            // Create user with provided username and password
            $userData = [
                'name' => $request->name,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'uuid' => Str::uuid(),
                'has_change_password' => true, // Set to true since user provided their own password
            ];

            // Handle photo upload
            if ($request->hasFile('photo')) {
                $path = $request->file('photo')->store('photos', 'public');
                $userData['photo'] = $path;
            }

            $user = User::create($userData);

            // Assign the 'siswa' role to the user
            $user->assignRole('student');

            // Create student
            $student = new Student($request->except('name', 'username', 'password', 'photo'));
            $student->user_id = $user->id;
            $student->save();

            DB::commit();
            return redirect()->route('students.index')->with('success', "Student created successfully.");
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to create student: ' . $e->getMessage());
            // Log the full exception for debugging
            Log::error($e->getTraceAsString());
            return $e;
            // Return with more detailed error information
            return redirect()->back()
                ->with('error', 'Failed to create student: ' . $e->getMessage())
                ->withErrors(['general' => 'An error occurred while creating the student.'])
                ->withInput();
        }
    }

    /**
     * Display the specified student.
     */
    public function show(Student $student)
    {
        $student->load('user');

        return Inertia::render('Students/Show', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the specified student.
     */
    public function edit(Student $student)
    {
        $student->load('user');

        return Inertia::render('Students/Edit', [
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
     * Update the specified student in storage.
     */
    public function update(Request $request, Student $student)
    {
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
            return redirect()->route('students.index')->with('success', 'Student updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to update student: ' . $e->getMessage());
            Log::error($e->getTraceAsString());
            return redirect()->back()
                ->with('error', 'Failed to update student: ' . $e->getMessage())
                ->withErrors(['general' => 'An error occurred while updating the student.'])
                ->withInput();
        }
    }

    /**
     * Remove the specified student from storage.
     */
    public function destroy(Student $student)
    {
        DB::beginTransaction();
        try {
            // Get user ID before deleting student
            $userId = $student->user_id;

            // Delete student
            $student->delete();

            // Delete associated user
            User::destroy($userId);

            DB::commit();
            return redirect()->route('students.index')->with('success', 'Student deleted successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to delete student: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete student: ' . $e->getMessage());
        }
    }
}
