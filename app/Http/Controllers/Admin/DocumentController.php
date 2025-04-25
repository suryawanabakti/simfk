<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DocumentController extends Controller
{
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

    public function index()
    {
        $documents = Document::with('uploader')->latest()->get();

        return Inertia::render('Admin/Documents/Index', [
            'documents' => $documents
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Documents/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'required|file|max:10240', // Max 10MB
        ]);

        $file = $request->file('file');
        $fileName = $file->getClientOriginalName();
        $filePath = $file->store('documents', 'public');

        Document::create([
            'name' => $request->name,
            'file_path' => $filePath,
            'file_name' => $fileName,
            'file_size' => $file->getSize(),
            'file_type' => $file->getMimeType(),
            'uploaded_by' => auth()->id(),
        ]);

        return redirect()->route('admin.documents.index')
            ->with('success', 'Document uploaded successfully.');
    }

    public function edit(Document $document)
    {
        return Inertia::render('Admin/Documents/Edit', [
            'document' => $document
        ]);
    }

    public function update(Request $request, Document $document)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'file' => 'nullable|file|max:10240', // Max 10MB
        ]);

        $data = [
            'name' => $request->name,
        ];

        if ($request->hasFile('file')) {
            // Delete old file
            if (Storage::disk('public')->exists($document->file_path)) {
                Storage::disk('public')->delete($document->file_path);
            }

            $file = $request->file('file');
            $fileName = $file->getClientOriginalName();
            $filePath = $file->store('documents', 'public');

            $data['file_path'] = $filePath;
            $data['file_name'] = $fileName;
            $data['file_size'] = $file->getSize();
            $data['file_type'] = $file->getMimeType();
        }

        $document->update($data);

        return redirect()->route('admin.documents.index')
            ->with('success', 'Document updated successfully.');
    }

    public function destroy(Document $document)
    {
        // Delete file
        if (Storage::disk('public')->exists($document->file_path)) {
            Storage::disk('public')->delete($document->file_path);
        }

        $document->delete();

        return redirect()->route('admin.documents.index')
            ->with('success', 'Document deleted successfully.');
    }
}
