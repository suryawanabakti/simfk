<?php

use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\DocumentController as AdminDocumentController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\ResetPasswordController;
use App\Http\Controllers\Student\DocumentController as StudentDocumentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\StudentProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        if (auth()->user()->hasRole(['admin', 'super'])) {
            return redirect()->route('admin.dashboard');
        } elseif (auth()->user()->hasRole('student')) {
            return redirect()->route('student.dashboard');
        }
    })->name('dashboard');

    Route::get('admin/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');

    // Document routes
    Route::get('/documents/print', [DocumentController::class, 'index'])->name('documents.print');
    Route::get('/documents/print/generate', [DocumentController::class, 'printDocuments'])->name('documents.print.submit');

    // Student routes
    Route::resource('students', StudentController::class);
    // Password reset route
    Route::post('/users/{user}/reset-password', [ResetPasswordController::class, 'reset'])->name('users.reset-password');

    Route::middleware(['role:student'])->group(function () {
        Route::get('/student/dashboard', [StudentProfileController::class, 'dashboard'])->name('student.dashboard');
        Route::get('/student/edit-profile', [StudentProfileController::class, 'edit'])->name('student.edit-profile');
        Route::put('/student/update-profile/{student}', [StudentProfileController::class, 'update'])->name('student.update-profile');

        Route::get('student/documents', [StudentDocumentController::class, 'index'])->name('documents.index');
        Route::get('student/documents/{document}/download', [StudentDocumentController::class, 'download'])->name('student.documents.download');
    });

    Route::get('admin/documents/{document}/download', [AdminDocumentController::class, 'download'])->name('admin.documents.download');
    Route::resource('admin/documents', AdminDocumentController::class)->names('admin.documents');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
