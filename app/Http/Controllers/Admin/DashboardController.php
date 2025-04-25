<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Get total students count
        $totalStudents = Student::count();

        // Get active students (users who have been seen in the last 30 days)
        $activeStudents = User::whereHas('student')
            ->whereNotNull('last_seen')
            ->where('last_seen', '>=', Carbon::now()->subDays(30))
            ->count();

        // Get new students this month
        $newStudentsThisMonth = Student::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->count();

        // Get students with completed profiles (simplified check - has most important fields filled)
        $completedProfiles = Student::whereNotNull('prodi')
            ->whereNotNull('jk')
            ->whereNotNull('tgl_lahir')
            ->whereNotNull('alamat')
            ->count();

        // Get students by gender
        $studentsByGender = [
            'male' => Student::where('jk', 'Laki-laki')->count(),
            'female' => Student::where('jk', 'Perempuan')->count(),
        ];

        // Get students by admission path
        $studentsByAdmission = [
            'SNMPTN' => Student::where('jalur_penerimaan', 'SNMPTN')->count(),
            'SBMPTN' => Student::where('jalur_penerimaan', 'SBMPTN')->count(),
            'Mandiri' => Student::where('jalur_penerimaan', 'Mandiri')->count(),
            'INTERNASIONAL' => Student::where('jalur_penerimaan', 'INTERNASIONAL')->count(),
        ];

        // Get students by year (angkatan)
        $studentsByYear = Student::select('angkatan', DB::raw('count(*) as total'))
            ->whereNotNull('angkatan')
            ->groupBy('angkatan')
            ->orderBy('angkatan')
            ->pluck('total', 'angkatan')
            ->toArray();

        // Get students by religion
        $studentsByReligion = Student::select('agama', DB::raw('count(*) as total'))
            ->whereNotNull('agama')
            ->groupBy('agama')
            ->pluck('total', 'agama')
            ->toArray();

        // Get recent students
        $recentStudents = Student::with('user')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($student) {
                return [
                    'id' => $student->id,
                    'name' => $student->user->name,
                    'prodi' => $student->prodi,
                    'jalur_penerimaan' => $student->jalur_penerimaan,
                    'angkatan' => $student->angkatan,
                    'created_at' => $student->created_at,
                    'photo' => $student->user->photo,
                ];
            });

        // Return data to the view
        return Inertia::render('dashboard', [
            'totalStudents' => $totalStudents,
            'activeStudents' => $activeStudents,
            'newStudentsThisMonth' => $newStudentsThisMonth,
            'completedProfiles' => $completedProfiles,
            'studentsByGender' => $studentsByGender,
            'studentsByAdmission' => $studentsByAdmission,
            'studentsByYear' => $studentsByYear,
            'studentsByReligion' => $studentsByReligion,
            'recentStudents' => $recentStudents,
        ]);
    }

    /**
     * Get detailed statistics for API requests
     */
    public function getStatistics()
    {
        // Get students by program study
        $studentsByProdi = Student::select('prodi', DB::raw('count(*) as total'))
            ->whereNotNull('prodi')
            ->groupBy('prodi')
            ->orderBy('total', 'desc')
            ->pluck('total', 'prodi')
            ->toArray();

        // Get students by province
        $studentsByProvince = Student::select('prov_lahir', DB::raw('count(*) as total'))
            ->whereNotNull('prov_lahir')
            ->groupBy('prov_lahir')
            ->orderBy('total', 'desc')
            ->pluck('total', 'prov_lahir')
            ->toArray();

        // Get registration trends (by month for current year)
        $registrationTrends = [];
        for ($month = 1; $month <= 12; $month++) {
            $count = Student::whereMonth('created_at', $month)
                ->whereYear('created_at', Carbon::now()->year)
                ->count();
            $registrationTrends[Carbon::create(null, $month, 1)->format('M')] = $count;
        }

        // Get students by parent's education level
        $parentEducation = [
            'father' => Student::select('pendidikan_ayah', DB::raw('count(*) as total'))
                ->whereNotNull('pendidikan_ayah')
                ->groupBy('pendidikan_ayah')
                ->pluck('total', 'pendidikan_ayah')
                ->toArray(),
            'mother' => Student::select('pendidikan_ibu', DB::raw('count(*) as total'))
                ->whereNotNull('pendidikan_ibu')
                ->groupBy('pendidikan_ibu')
                ->pluck('total', 'pendidikan_ibu')
                ->toArray(),
        ];

        // Get students by blood type
        $studentsByBloodType = Student::select('gol_darah', DB::raw('count(*) as total'))
            ->whereNotNull('gol_darah')
            ->groupBy('gol_darah')
            ->pluck('total', 'gol_darah')
            ->toArray();

        return response()->json([
            'studentsByProdi' => $studentsByProdi,
            'studentsByProvince' => $studentsByProvince,
            'registrationTrends' => $registrationTrends,
            'parentEducation' => $parentEducation,
            'studentsByBloodType' => $studentsByBloodType,
        ]);
    }

    /**
     * Get student distribution map data
     */
    public function getMapData()
    {
        $provinceData = Student::select('prov_lahir', DB::raw('count(*) as total'))
            ->whereNotNull('prov_lahir')
            ->groupBy('prov_lahir')
            ->orderBy('prov_lahir')
            ->get();

        return response()->json($provinceData);
    }

    /**
     * Get academic performance data
     */
    public function getAcademicData()
    {
        // This would typically come from a grades or courses table
        // For now, we'll return placeholder data
        return response()->json([
            'success' => true,
            'message' => 'Academic data API endpoint. Connect to grades database for real data.',
        ]);
    }
}
