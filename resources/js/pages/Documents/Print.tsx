'use client';

import type React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
    AwardIcon,
    BookOpenIcon,
    CalendarIcon,
    BadgeIcon as CertificateIcon,
    CheckCircleIcon,
    ClipboardIcon,
    EyeIcon,
    FileIcon,
    FileTextIcon,
    FilterIcon,
    GraduationCapIcon,
    HeartIcon,
    HomeIcon,
    MapPinIcon,
    PrinterIcon,
    SearchIcon,
    ShieldIcon,
    UserIcon,
    UserPlusIcon,
    UsersIcon,
} from 'lucide-react';
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
    agama: string;
    suku: string;
    jml_kakak: number;
    jml_adik: number;
    status_huni_rumah: string;
    nama_sekolah: string;
    thn_lulus: string;
    no_ijazah: string;
    akademik: string;
    non_akademik: string;
    olahraga: string;
    kesenian: string;
    nama_ayah: string;
    agama_ayah: string;
    pekerjaan_ayah: string;
    pendidikan_ayah: string;
    penghasilan_ayah: string;
    nohp_ayah: string;
    nama_ibu: string;
    agama_ibu: string;
    pekerjaan_ibu: string;
    pendidikan_ibu: string;
    penghasilan_ibu: string;
    nohp_ibu: string;
    alamat_orangtua: string;
    daya_listrik: string;
    nama_wali: string;
    perkejaan_wali: string;
    penghasilan_wali: string;
    pendidikan_wali: string;
    alamat_wali: string;
    nohp_wali: string;
    kab_lahir: string;
    prov_lahir: string;
    kab_sekolah: string;
    prov_sekolah: string;
    thn_masuk: string;
    jml_mapel: string;
    nilai: string;
    tinggi: string;
    berat: string;
    tekanan_darah: string;
    gol_darah: string;
    user: {
        id: number;
        name: string;
        username: string;
        photo: string | null;
    };
}

interface Props {
    students: Student[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Print Documents',
        href: '/documents/print',
    },
];

// Document type definitions with icons and descriptions
const documentTypes = [
    {
        id: 'biodata',
        name: 'Biodata Mahasiswa',
        icon: FileTextIcon,
        description: 'Format biodata mahasiswa standar',
        color: 'text-blue-500',
    },
    {
        id: 'biodata-unhas',
        name: 'Biodata Unhas',
        icon: FileIcon,
        description: 'Format biodata dengan tabel dan foto',
        color: 'text-indigo-500',
    },
    {
        id: 'biodata-fk',
        name: 'Biodata FK',
        icon: ClipboardIcon,
        description: 'Format biodata khusus Fakultas Kedokteran',
        color: 'text-purple-500',
    },
    {
        id: 'surat-aktif-kuliah',
        name: 'Surat Aktif Kuliah',
        icon: CertificateIcon,
        description: 'Surat keterangan aktif kuliah',
        color: 'text-green-500',
    },
    {
        id: 'surat-rekomendasi',
        name: 'Surat Rekomendasi',
        icon: AwardIcon,
        description: 'Surat rekomendasi untuk beasiswa',
        color: 'text-amber-500',
    },
    {
        id: 'surat-keterangan-beasiswa',
        name: 'Surat Keterangan Beasiswa',
        icon: FileIcon,
        description: 'Surat pernyataan tidak menerima beasiswa',
        color: 'text-red-500',
    },
    {
        id: 'surat-kelakuan-baik',
        name: 'Surat Kelakuan Baik',
        icon: ShieldIcon,
        description: 'Surat keterangan berkelakuan baik',
        color: 'text-teal-500',
    },
];

export default function PrintDocuments({ students }: Props) {
    const [selectedStudents, setSelectedStudents] = useState<number[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [documentType, setDocumentType] = useState('biodata');
    const [selectAll, setSelectAll] = useState(false);
    const [programFilter, setProgramFilter] = useState<string | null>(null);
    const [batchFilter, setBatchFilter] = useState<number | null>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const { post, processing } = useForm({
        selectedStudents: [] as number[],
        documentType: 'biodata',
    });

    // Get unique programs and batches for filters
    const programs = [...new Set(students.filter((s) => s.prodi).map((s) => s.prodi))].sort();
    const batches = [...new Set(students.filter((s) => s.angkatan).map((s) => s.angkatan))].sort((a, b) => b - a);

    // Filter students based on search query and filters
    const filteredStudents = students.filter((student) => {
        const matchesSearch =
            student.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.no_test?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesProgram = !programFilter || student.prodi === programFilter;
        const matchesBatch = !batchFilter || student.angkatan === batchFilter;

        return matchesSearch && matchesProgram && matchesBatch;
    });

    // Handle checkbox change
    const handleCheckboxChange = (studentId: number) => {
        if (selectedStudents.includes(studentId)) {
            setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
        } else {
            setSelectedStudents([...selectedStudents, studentId]);
        }
    };

    // Handle select all checkbox
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedStudents([]);
        } else {
            setSelectedStudents(filteredStudents.map((student) => student.id));
        }
        setSelectAll(!selectAll);
    };

    // Reset all filters
    const resetFilters = () => {
        setSearchQuery('');
        setProgramFilter(null);
        setBatchFilter(null);
    };

    // Open student details modal
    const openStudentDetails = (student: Student) => {
        setSelectedStudent(student);
        setDetailsOpen(true);
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create a form element
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = '/documents/print/generate';
        form.target = '_blank'; // This makes it open in a new tab

        // Add CSRF token
        const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = '_token';
        csrfInput.value = csrfToken || '';
        form.appendChild(csrfInput);

        // Add selected students
        selectedStudents.forEach((studentId) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = 'selectedStudents[]';
            input.value = studentId.toString();
            form.appendChild(input);
        });

        // Add document type
        const docTypeInput = document.createElement('input');
        docTypeInput.type = 'hidden';
        docTypeInput.name = 'documentType';
        docTypeInput.value = documentType;
        form.appendChild(docTypeInput);

        // Append to body, submit, and remove
        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    // Get admission badge color
    const getAdmissionBadgeColor = (jalur?: string) => {
        if (!jalur) return 'bg-gray-100 text-gray-800';

        switch (jalur) {
            case 'SNMPTN':
                return 'bg-blue-100 text-blue-800';
            case 'SBMPTN':
                return 'bg-green-100 text-green-800';
            case 'Mandiri':
                return 'bg-purple-100 text-purple-800';
            case 'INTERNASIONAL':
                return 'bg-amber-100 text-amber-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Find the selected document type
    const selectedDocType = documentTypes.find((dt) => dt.id === documentType);

    // Format data for display
    const formatData = (value: any) => {
        if (value === null || value === undefined || value === '') {
            return '-';
        }
        return value;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Print Documents" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="flex items-center gap-2 text-2xl font-bold">
                            <PrinterIcon className="h-6 w-6 text-indigo-600" />
                            Print Student Documents
                        </h1>
                        <p className="mt-1 text-gray-500">Select students and document type to print</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Card className="overflow-hidden border-none shadow-md md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileTextIcon className="h-5 w-5" />
                                Select Students
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="border-b bg-gray-50 p-4">
                                <div className="flex flex-col gap-3 md:flex-row">
                                    <div className="relative flex-1">
                                        <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type="text"
                                            placeholder="Search by name, username, or ID..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <Select
                                            value={programFilter || 'all'}
                                            onValueChange={(value) => setProgramFilter(value === 'all' ? null : value)}
                                        >
                                            <SelectTrigger className="w-[180px] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                                                <div className="flex items-center gap-2">
                                                    <GraduationCapIcon className="h-4 w-4 text-indigo-500" />
                                                    <SelectValue placeholder="Program" />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Programs</SelectItem>
                                                {programs.map((program) => (
                                                    <SelectItem key={program} value={program}>
                                                        {program}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Select
                                            value={batchFilter?.toString() || 'all'}
                                            onValueChange={(value) => setBatchFilter(value === 'all' ? null : Number.parseInt(value))}
                                        >
                                            <SelectTrigger className="w-[140px] border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
                                                <div className="flex items-center gap-2">
                                                    <CalendarIcon className="h-4 w-4 text-indigo-500" />
                                                    <SelectValue placeholder="Batch" />
                                                </div>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All Batches</SelectItem>
                                                {batches.map((batch) => (
                                                    <SelectItem key={batch} value={batch.toString()}>
                                                        {batch}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        {(searchQuery || programFilter || batchFilter) && (
                                            <Button variant="outline" onClick={resetFilters} className="border-gray-300 text-gray-600">
                                                Reset
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="border-b bg-white p-4">
                                <div className="mb-4 flex items-center">
                                    <Checkbox
                                        id="selectAll"
                                        checked={selectAll}
                                        onCheckedChange={handleSelectAll}
                                        className="mr-2 h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <Label htmlFor="selectAll" className="flex items-center gap-2 font-medium">
                                        Select All Students
                                        <span className="text-sm text-gray-500">({filteredStudents.length} students)</span>
                                    </Label>
                                </div>
                            </div>

                            <div className="max-h-[400px] overflow-y-auto">
                                {filteredStudents.length > 0 ? (
                                    <ul className="divide-y">
                                        {filteredStudents.map((student) => (
                                            <li key={student.id} className="flex items-center p-4 transition-colors hover:bg-gray-50">
                                                <Checkbox
                                                    id={`student-${student.id}`}
                                                    checked={selectedStudents.includes(student.id)}
                                                    onCheckedChange={() => handleCheckboxChange(student.id)}
                                                    className="mr-4 h-5 w-5 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <div className="flex flex-1 items-center gap-3">
                                                    <div className="flex-shrink-0">
                                                        {student.user.photo ? (
                                                            <img
                                                                src={`/storage/${student.user.photo}`}
                                                                alt={student.user.name}
                                                                className="h-10 w-10 rounded-full border-2 border-indigo-100 object-cover"
                                                            />
                                                        ) : (
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                                                                <UserIcon className="h-5 w-5" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1">
                                                        <Label htmlFor={`student-${student.id}`} className="cursor-pointer font-medium text-gray-900">
                                                            {student.user.name}
                                                        </Label>
                                                        <div className="font-mono text-sm text-gray-500">{student.user.username}</div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-end gap-2">
                                                        {student.angkatan && (
                                                            <Badge className="flex items-center gap-1 bg-indigo-100 text-indigo-800">
                                                                <CalendarIcon className="h-3 w-3" />
                                                                <span>{student.angkatan}</span>
                                                            </Badge>
                                                        )}
                                                        {student.prodi && (
                                                            <Badge className="flex items-center gap-1 bg-purple-100 text-purple-800">
                                                                <GraduationCapIcon className="h-3 w-3" />
                                                                <span>{student.prodi}</span>
                                                            </Badge>
                                                        )}

                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="ml-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
                                                            onClick={() => openStudentDetails(student)}
                                                        >
                                                            <EyeIcon className="mr-1 h-4 w-4" />
                                                            Details
                                                        </Button>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <SearchIcon className="mb-2 h-12 w-12 text-gray-300" />
                                            <p className="text-lg font-medium">No students found</p>
                                            <p className="text-sm">Try adjusting your search criteria or filters</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PrinterIcon className="h-5 w-5" />
                                Document Options
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="documentType" className="font-medium text-gray-700">
                                            Document Type
                                        </Label>
                                        <Select value={documentType} onValueChange={(value) => setDocumentType(value)}>
                                            <SelectTrigger
                                                id="documentType"
                                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                            >
                                                <SelectValue placeholder="Select document type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {documentTypes.map((docType) => (
                                                    <SelectItem key={docType.id} value={docType.id}>
                                                        <div className="flex items-center gap-2">
                                                            <docType.icon className={`h-4 w-4 ${docType.color}`} />
                                                            <span>{docType.name}</span>
                                                        </div>
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    {selectedDocType && (
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-full bg-white ${selectedDocType.color}`}
                                                >
                                                    <selectedDocType.icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{selectedDocType.name}</p>
                                                    <p className="text-sm text-gray-600">{selectedDocType.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedStudents.length > 0 && (
                                        <div className="rounded-lg border border-indigo-100 bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                                                    <CheckCircleIcon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-indigo-800">
                                                        {selectedStudents.length} {selectedStudents.length === 1 ? 'student' : 'students'} selected
                                                    </p>
                                                    <p className="text-sm text-indigo-600">Ready to generate documents</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={processing || selectedStudents.length === 0}
                                            className="h-12 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-base hover:from-indigo-700 hover:to-purple-700"
                                        >
                                            <PrinterIcon className="mr-2 h-5 w-5" />
                                            {processing ? 'Processing...' : 'Print Selected Documents'}
                                        </Button>
                                    </div>

                                    {selectedStudents.length === 0 && (
                                        <div className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
                                            <div className="flex items-start gap-2">
                                                <FilterIcon className="mt-0.5 h-5 w-5 flex-shrink-0" />
                                                <div>
                                                    <p className="font-medium">No students selected</p>
                                                    <p>Please select at least one student to print documents</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Student Details Modal */}
                <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                    <DialogContent className="min-w-full overflow-hidden p-0">
                        <DialogHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                            <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                                <UserIcon className="h-5 w-5" />
                                Student Details
                            </DialogTitle>
                            <DialogDescription className="text-indigo-100">Complete information about the selected student</DialogDescription>
                        </DialogHeader>

                        {selectedStudent && (
                            <div className="flex h-full flex-col">
                                <div className="border-b bg-gray-50 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex-shrink-0">
                                            {selectedStudent.user.photo ? (
                                                <img
                                                    src={`/storage/${selectedStudent.user.photo}`}
                                                    alt={selectedStudent.user.name}
                                                    className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
                                                />
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md">
                                                    <UserIcon className="h-10 w-10" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-2xl font-bold text-gray-900">{selectedStudent.user.name}</h3>
                                            <div className="mt-1 flex flex-wrap items-center gap-2">
                                                <Badge variant="outline" className="border-gray-300 font-mono text-gray-600">
                                                    {selectedStudent.user.username}
                                                </Badge>
                                                {selectedStudent.prodi && (
                                                    <Badge className="flex items-center gap-1 bg-purple-100 text-purple-800">
                                                        <GraduationCapIcon className="h-3 w-3" />
                                                        {selectedStudent.prodi}
                                                    </Badge>
                                                )}
                                                {selectedStudent.angkatan && (
                                                    <Badge className="flex items-center gap-1 bg-indigo-100 text-indigo-800">
                                                        <CalendarIcon className="h-3 w-3" />
                                                        {selectedStudent.angkatan}
                                                    </Badge>
                                                )}
                                                {selectedStudent.jalur_penerimaan && (
                                                    <Badge className={getAdmissionBadgeColor(selectedStudent.jalur_penerimaan)}>
                                                        {selectedStudent.jalur_penerimaan}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Tabs defaultValue="personal" className="flex-1 overflow-hidden">
                                    <div className="border-b bg-white px-6">
                                        <TabsList className="h-14">
                                            <TabsTrigger value="personal" className="flex items-center gap-1">
                                                <UserIcon className="h-4 w-4" />
                                                <span>Personal</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="academic" className="flex items-center gap-1">
                                                <GraduationCapIcon className="h-4 w-4" />
                                                <span>Academic</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="family" className="flex items-center gap-1">
                                                <UsersIcon className="h-4 w-4" />
                                                <span>Family</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="health" className="flex items-center gap-1">
                                                <HeartIcon className="h-4 w-4" />
                                                <span>Health</span>
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>

                                    <ScrollArea className="h-[calc(90vh-240px)] w-full overflow-y-auto">
                                        <div className="p-6">
                                            <TabsContent value="personal" className="m-0">
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <UserIcon className="h-5 w-5 text-indigo-500" />
                                                                Basic Information
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.user.name)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                                                                    <dd className="font-mono text-sm text-gray-900">
                                                                        {formatData(selectedStudent.user.username)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Test Number</dt>
                                                                    <dd className="font-mono text-sm text-gray-900">
                                                                        {formatData(selectedStudent.no_test)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.jk)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Religion</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.agama)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Ethnicity</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.suku)}</dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <MapPinIcon className="h-5 w-5 text-indigo-500" />
                                                                Contact Information
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.email)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.nohp)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.alamat)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Place of Birth</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.tmp_lahir)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.tgl_lahir)}</dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className="md:col-span-2">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <HomeIcon className="h-5 w-5 text-indigo-500" />
                                                                Housing & Family
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Housing Status</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.status_huni_rumah)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Number of Siblings</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {selectedStudent.jml_kakak || selectedStudent.jml_adik
                                                                            ? `${selectedStudent.jml_kakak || 0} older, ${selectedStudent.jml_adik || 0} younger`
                                                                            : '-'}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Home Electricity</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.daya_listrik)}
                                                                    </dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="academic" className="m-0">
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <GraduationCapIcon className="h-5 w-5 text-indigo-500" />
                                                                Academic Information
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Program</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.prodi)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Batch Year</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.angkatan)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Admission Path</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.jalur_penerimaan)}
                                                                    </dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <BookOpenIcon className="h-5 w-5 text-indigo-500" />
                                                                Previous Education
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">School Name</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.nama_sekolah)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">School Location</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {selectedStudent.kab_sekolah || selectedStudent.prov_sekolah
                                                                            ? `${selectedStudent.kab_sekolah || ''}, ${selectedStudent.prov_sekolah || ''}`
                                                                            : '-'}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Entry Year</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.thn_masuk)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Graduation Year</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.thn_lulus)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Certificate Number</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.no_ijazah)}</dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>

                                                    <Card className="md:col-span-2">
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <AwardIcon className="h-5 w-5 text-indigo-500" />
                                                                Achievements & Interests
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Academic Achievements</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.akademik)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Non-Academic Achievements</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.non_akademik)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Sports</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.olahraga)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Arts</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.kesenian)}</dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="family" className="m-0">
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <UserIcon className="h-5 w-5 text-indigo-500" />
                                                                Father's Information
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.nama_ayah)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Religion</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.agama_ayah)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.nohp_ayah)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.pekerjaan_ayah)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Education</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.pendidikan_ayah)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.penghasilan_ayah)}
                                                                    </dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <UserIcon className="h-5 w-5 text-indigo-500" />
                                                                Mother's Information
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.nama_ibu)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Religion</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.agama_ibu)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.nohp_ibu)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.pekerjaan_ibu)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Education</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.pendidikan_ibu)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.penghasilan_ibu)}
                                                                    </dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <UserPlusIcon className="h-5 w-5 text-indigo-500" />
                                                                Guardian's Information
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.nama_wali)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.nohp_wali)}</dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.perkejaan_wali)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Education</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.pendidikan_wali)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.penghasilan_wali)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.alamat_wali)}
                                                                    </dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>

                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <HomeIcon className="h-5 w-5 text-indigo-500" />
                                                                Parents' Address
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.alamat_orangtua)}
                                                                    </dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>

                                            <TabsContent value="health" className="m-0">
                                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                                    <Card>
                                                        <CardHeader className="pb-2">
                                                            <CardTitle className="flex items-center gap-2 text-lg">
                                                                <HeartIcon className="h-5 w-5 text-indigo-500" />
                                                                Health Information
                                                            </CardTitle>
                                                        </CardHeader>
                                                        <CardContent>
                                                            <dl className="space-y-2">
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Height</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {selectedStudent.tinggi ? `${selectedStudent.tinggi} cm` : '-'}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Weight</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {selectedStudent.berat ? `${selectedStudent.berat} kg` : '-'}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Blood Pressure</dt>
                                                                    <dd className="text-sm text-gray-900">
                                                                        {formatData(selectedStudent.tekanan_darah)}
                                                                    </dd>
                                                                </div>
                                                                <Separator />
                                                                <div className="flex justify-between">
                                                                    <dt className="text-sm font-medium text-gray-500">Blood Type</dt>
                                                                    <dd className="text-sm text-gray-900">{formatData(selectedStudent.gol_darah)}</dd>
                                                                </div>
                                                            </dl>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </TabsContent>
                                        </div>
                                    </ScrollArea>
                                </Tabs>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>
        </AppLayout>
    );
}
