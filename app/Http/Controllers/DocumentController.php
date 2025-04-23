<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DocumentController extends Controller
{
    /**
     * Display the document printing page.
     */
    public function index()
    {
        // Check if user has super role
        if (!Auth::user()->hasRole('super')) {
            abort(403, 'Unauthorized action.');
        }

        // Get all students with their users
        $students = Student::with('user')->get();

        return Inertia::render('Documents/Print', [
            'students' => $students,
        ]);
    }

    /**
     * Print selected student documents.
     */
    public function printDocuments(Request $request)
    {
        // Check if user has super role
        if (!Auth::user()->hasRole('super')) {
            abort(403, 'Unauthorized action.');
        }

        $request->validate([
            'selectedStudents' => 'required|array',
            'selectedStudents.*' => 'exists:students,id',
            'documentType' => 'required|string|in:biodata,biodata-unhas,biodata-fk,surat-aktif-kuliah,surat-rekomendasi,surat-keterangan-beasiswa,surat-kelakuan-baik',
        ]);

        $selectedStudentIds = $request->selectedStudents;
        $documentType = $request->documentType;

        // Get selected students with their users
        $selectedUsers = Student::whereIn('id', $selectedStudentIds)
            ->with('user')
            ->get()
            ->map(function ($student) {
                return [
                    'name' => $student->user->name,
                    'username' => $student->user->username,
                    'photo' => $student->user->photo,
                    'student' => $student->toArray(),
                    'jk' => $student->jk,
                ];
            });

        // Return the appropriate view based on document type
        switch ($documentType) {
            case 'biodata':
                return view('documents.biodata', [
                    'selectedUsers' => $selectedUsers,
                ]);
            case 'biodata-unhas':
                return view('documents.biodata-unhas', [
                    'selectedUsers' => $selectedUsers,
                ]);
            case 'biodata-fk':
                return view('documents.biodata-fk', [
                    'selectedUsers' => $selectedUsers,
                ]);
            case 'surat-aktif-kuliah':
                return view('surat.surat-aktif-kuliah', [
                    'selectedUsers' => $selectedUsers,
                ]);
            case 'surat-rekomendasi':
                return view('surat.surat-rekomendasi', [
                    'selectedUsers' => $selectedUsers,
                ]);
            case 'surat-keterangan-beasiswa':
                return view('surat.surat-keterangan-beasiswa', [
                    'selectedUsers' => $selectedUsers,
                ]);
            case 'surat-kelakuan-baik':
                return view('surat.surat-kelakuan-baik', [
                    'selectedUsers' => $selectedUsers,
                ]);
            default:
                return back()->with('error', 'Invalid document type.');
        }
    }
}
