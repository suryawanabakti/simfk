'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { GraduationCapIcon, PlusIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';

// Import components
import EmptyStudentList from '@/components/Students/EmptyStudentList';
import Pagination from '@/components/Students/Pagination';
import StudentList from '@/components/Students/StudentList';

interface Student {
    id: number;
    no_test: string;
    jalur_penerimaan: string;
    prodi: string;
    email: string;
    user: {
        id: number;
        name: string;
    };
}

interface Props {
    students: {
        data: Student[];
        links: any[];
        current_page: number;
        last_page: number;
    };
    filters: {
        search: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Students',
        href: '/students',
    },
];

export default function Index({ students, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const { flash } = usePage().props;

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/students', { search }, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {flash.success && (
                    <div className="mb-4 rounded-md border border-green-200 bg-green-50 p-4 shadow-sm">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">{flash.success}</p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="flex items-center gap-2 text-2xl font-bold">
                            <GraduationCapIcon className="h-6 w-6 text-indigo-600" />
                            Students Management
                        </h1>
                        <p className="mt-1 text-gray-500">Manage all student records and information</p>
                    </div>
                    <Link href={route('students.create')}>
                        <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md transition-all duration-200 hover:from-indigo-700 hover:to-purple-700">
                            <PlusIcon className="h-4 w-4" />
                            Add Student
                        </Button>
                    </Link>
                </div>

                <Card className="border-gray-200 shadow-md">
                    <CardHeader className="border-b bg-gray-50 pb-3">
                        <CardTitle>Student Records</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border-b p-4">
                            <form onSubmit={handleSearch} className="flex gap-2">
                                <div className="relative flex-1">
                                    <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Search by name, email, or test number..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500"
                                    />
                                </div>
                                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                                    Search
                                </Button>
                            </form>
                        </div>

                        {students.data.length > 0 ? <StudentList students={students.data} route={route} /> : <EmptyStudentList />}

                        <Pagination links={students.links} current_page={students.current_page} last_page={students.last_page} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
