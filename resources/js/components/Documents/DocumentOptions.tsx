'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { FileCheck, FileClock, FileCode, FileSpreadsheet, FileText, FileWarning, FileX } from 'lucide-react';

interface DocumentOptionsProps {
    documentTypes: string[];
    selectedDocumentType: string;
    onDocumentTypeChange: (type: string) => void;
}

// Document type definitions with icons and descriptions
const documentTypeInfo = {
    biodata: {
        name: 'Biodata Mahasiswa',
        description: 'Format biodata mahasiswa standar',
        icon: FileText,
        color: 'text-blue-500',
    },
    'biodata-unhas': {
        name: 'Biodata Unhas',
        description: 'Format biodata dengan tabel dan foto',
        icon: FileSpreadsheet,
        color: 'text-indigo-500',
    },
    'biodata-fk': {
        name: 'Biodata FK',
        description: 'Format biodata khusus Fakultas Kedokteran',
        icon: FileCode,
        color: 'text-purple-500',
    },
    'surat-aktif-kuliah': {
        name: 'Surat Aktif Kuliah',
        description: 'Surat keterangan aktif kuliah',
        icon: FileCheck,
        color: 'text-green-500',
    },
    'surat-rekomendasi': {
        name: 'Surat Rekomendasi',
        description: 'Surat rekomendasi untuk beasiswa',
        icon: FileClock,
        color: 'text-amber-500',
    },
    'surat-keterangan-beasiswa': {
        name: 'Surat Keterangan Beasiswa',
        description: 'Surat pernyataan tidak menerima beasiswa',
        icon: FileWarning,
        color: 'text-red-500',
    },
    'surat-kelakuan-baik': {
        name: 'Surat Kelakuan Baik',
        description: 'Surat keterangan berkelakuan baik',
        icon: FileX,
        color: 'text-teal-500',
    },
};

export default function DocumentOptions({ documentTypes, selectedDocumentType, onDocumentTypeChange }: DocumentOptionsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Document Type</CardTitle>
                <CardDescription>Select the type of document to generate</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup value={selectedDocumentType} onValueChange={onDocumentTypeChange} className="space-y-3">
                    {documentTypes.map((type) => {
                        const info = documentTypeInfo[type as keyof typeof documentTypeInfo] || {
                            name: type,
                            description: 'Document template',
                            icon: FileText,
                            color: 'text-gray-500',
                        };
                        const Icon = info.icon;

                        return (
                            <div key={type} className="flex items-start space-x-3">
                                <RadioGroupItem value={type} id={`doc-${type}`} className="mt-1" />
                                <Label htmlFor={`doc-${type}`} className="flex cursor-pointer flex-col">
                                    <div className="flex items-center">
                                        <Icon className={`mr-2 h-5 w-5 ${info.color}`} />
                                        <span className="font-medium">{info.name}</span>
                                    </div>
                                    <span className="text-muted-foreground text-sm">{info.description}</span>
                                </Label>
                            </div>
                        );
                    })}
                </RadioGroup>
            </CardContent>
        </Card>
    );
}
