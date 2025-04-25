<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller
{
    public function index()
    {
        $documents = Document::latest()->get();

        return Inertia::render('Student/Documents/Index', [
            'documents' => $documents
        ]);
    }

    public function download(Document $document)
    {
        if (!Storage::disk('public')->exists($document->file_path)) {
            return back()->with('error', 'File not found.');
        }

        return Storage::disk('public')->download(
            $document->file_path,
            $document->file_name
        );
    }
}
