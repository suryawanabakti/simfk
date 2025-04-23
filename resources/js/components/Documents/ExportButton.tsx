'use client';

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CheckIcon, DownloadIcon } from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    user_id: number;
    no_test: string;
    jalur_penerimaan: string;
    prodi: string;
    angkatan: number;
    email: string;
    jk: string;
    tmp_lahir: string;
    tgl_lahir: string;
    alamat: string;
    nohp: string;
    user: {
        id: number;
        name: string;
        username: string;
        photo: string | null;
    };
    [key: string]: any;
}

interface ExportButtonProps {
    students: Student[];
    filteredStudents?: Student[];
    exportType?: 'all' | 'filtered';
    className?: string;
}

export default function ExportButton({ students, filteredStudents = [], exportType = 'all', className = '' }: ExportButtonProps) {
    const [exporting, setExporting] = useState(false);

    const exportToCSV = () => {
        setExporting(true);

        try {
            // Determine which students to export
            const dataToExport = exportType === 'filtered' && filteredStudents.length > 0 ? filteredStudents : students;

            // Define the headers for the CSV
            const headers = [
                'Name',
                'Student ID',
                'Test Number',
                'Program',
                'Batch',
                'Admission Path',
                'Email',
                'Gender',
                'Place of Birth',
                'Date of Birth',
                'Phone',
            ];

            // Map the student data to CSV rows
            const csvRows = [
                headers.join(','), // Header row
                ...dataToExport.map((student) => {
                    const values = [
                        `"${student.user.name || ''}"`,
                        `"${student.user.username || ''}"`,
                        `"${student.no_test || ''}"`,
                        `"${student.prodi || ''}"`,
                        `"${student.angkatan || ''}"`,
                        `"${student.jalur_penerimaan || ''}"`,
                        `"${student.email || ''}"`,
                        `"${student.jk || ''}"`,
                        `"${student.tmp_lahir || ''}"`,
                        `"${student.tgl_lahir || ''}"`,
                        `"${student.nohp || ''}"`,
                    ];
                    return values.join(',');
                }),
            ];

            // Create a CSV string
            const csvString = csvRows.join('\n');

            // Create a Blob and download link
            const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', `students_export_${new Date().toISOString().slice(0, 10)}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            toast({
                title: 'Export Successful',
                description: `Exported ${dataToExport.length} students to CSV.`,
                variant: 'default',
            });
        } catch (error) {
            console.error('Export error:', error);
            toast({
                title: 'Export Failed',
                description: 'There was an error exporting the data. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setExporting(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={exportToCSV}
            disabled={exporting}
            className={`flex items-center gap-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800 ${className}`}
        >
            {exporting ? (
                <>
                    <CheckIcon className="h-4 w-4" />
                    <span>Exported</span>
                </>
            ) : (
                <>
                    <DownloadIcon className="h-4 w-4" />
                    <span>Export CSV</span>
                </>
            )}
        </Button>
    );
}
