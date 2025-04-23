'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, EyeIcon, FileTextIcon, GraduationCapIcon, SearchIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';
import ExportButton from './ExportButton';

interface Student {
    id: number;
    user_id: number;
    no_test: string;
    jalur_penerimaan: string;
    prodi: string;
    angkatan: number;
    email: string;
    user: {
        id: number;
        name: string;
        username: string;
        photo: string | null;
    };
    [key: string]: any;
}

interface StudentListProps {
    students: Student[];
    selectedStudents: number[];
    setSelectedStudents: (students: number[]) => void;
    onViewDetails: (student: Student) => void;
}

export default function StudentList({ students, selectedStudents, setSelectedStudents, onViewDetails }: StudentListProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [programFilter, setProgramFilter] = useState<string | null>(null);
    const [batchFilter, setBatchFilter] = useState<number | null>(null);
    const [selectAll, setSelectAll] = useState(false);

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

    return (
        <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5" />
                    Select Students
                </CardTitle>
                <ExportButton
                    students={students}
                    filteredStudents={filteredStudents}
                    exportType={filteredStudents.length < students.length ? 'filtered' : 'all'}
                    className="bg-white text-indigo-700 hover:bg-gray-100"
                />
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
                            <Select value={programFilter || 'all'} onValueChange={(value) => setProgramFilter(value === 'all' ? null : value)}>
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
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center">
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
                        {filteredStudents.length > 0 && selectedStudents.length > 0 && (
                            <div className="text-sm font-medium text-indigo-600">
                                {selectedStudents.length} of {filteredStudents.length} selected
                            </div>
                        )}
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
                                            {student.jalur_penerimaan && (
                                                <Badge className={getAdmissionBadgeColor(student.jalur_penerimaan)}>{student.jalur_penerimaan}</Badge>
                                            )}
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="ml-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
                                                onClick={() => onViewDetails(student)}
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
    );
}
