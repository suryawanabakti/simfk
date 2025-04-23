'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertTriangle, Loader2, Printer } from 'lucide-react';

interface PrintConfirmationDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    selectedStudentCount: number;
    documentType: string;
    isLoading: boolean;
}

// Document type display names
const documentTypeNames: Record<string, string> = {
    biodata: 'Biodata Mahasiswa',
    'biodata-unhas': 'Biodata Unhas',
    'biodata-fk': 'Biodata FK',
    'surat-aktif-kuliah': 'Surat Aktif Kuliah',
    'surat-rekomendasi': 'Surat Rekomendasi',
    'surat-keterangan-beasiswa': 'Surat Keterangan Beasiswa',
    'surat-kelakuan-baik': 'Surat Kelakuan Baik',
};

export function PrintConfirmationDialog({ isOpen, onClose, onConfirm, selectedStudentCount, documentType, isLoading }: PrintConfirmationDialogProps) {
    // Get the display name for the document type
    const documentName = documentTypeNames[documentType] || documentType;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[85vh] w-[90vw] overflow-y-auto sm:max-w-xl md:max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Printer className="text-primary h-5 w-5" />
                        Confirm Document Generation
                    </DialogTitle>
                    <DialogDescription>
                        You are about to generate documents for {selectedStudentCount} student
                        {selectedStudentCount !== 1 ? 's' : ''}.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="mb-4 rounded-lg border p-4">
                        <h3 className="mb-2 font-medium">Document Details</h3>
                        <ul className="space-y-2">
                            <li className="flex justify-between">
                                <span className="text-muted-foreground">Document Type:</span>
                                <span className="font-medium">{documentName}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-muted-foreground">Number of Students:</span>
                                <span className="font-medium">{selectedStudentCount}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="flex items-start gap-3 rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-800">
                        <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-500" />
                        <div>
                            <p className="font-medium">Important Note</p>
                            <p className="text-sm">
                                The documents will open in a new tab. Please ensure your browser doesn't block pop-ups. You can print or save the
                                documents from the new tab.
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex flex-col gap-2 sm:flex-row">
                    <Button variant="outline" onClick={onClose} disabled={isLoading} className="w-full sm:w-auto">
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 sm:w-auto"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Printer className="mr-2 h-4 w-4" />
                                Generate Documents
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
