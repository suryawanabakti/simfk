'use client';

import StudentProfileHeader from '@/components/Students/StudentProfileHeader';
import StudentProfileSection from '@/components/Students/StudentProfileSection';
import StudentProfileStats from '@/components/Students/StudentProfileStats';
import StudentProfileTimeline from '@/components/Students/StudentProfileTimeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BadgeIcon, BookOpenIcon, GraduationCapIcon, HeartIcon, HomeIcon, PencilIcon, ShieldIcon, UserIcon, Users2Icon } from 'lucide-react';
import { useState } from 'react';

interface Student {
    id: number;
    user_id: number;
    photo: string | null;
    no_test: string;
    jalur_penerimaan: string;
    angkatan: number;
    prodi: string;
    tmp_lahir: string;
    tgl_lahir: string;
    kab_lahir: string;
    prov_lahir: string;
    jk: string;
    alamat: string;
    nohp: string;
    email: string;
    agama: string;
    suku: string;
    kewarnegaraan: string;
    jml_kakak: number;
    jml_adik: number;
    status_huni_rumah: string;
    akademik: string;
    non_akademik: string;
    olahraga: string;
    kesenian: string;
    nama_ayah: string;
    agama_ayah: string;
    pendidikan_ayah: string;
    penghasilan_ayah: number;
    pekerjaan_ayah: string;
    nohp_ayah: string;
    nama_ibu: string;
    agama_ibu: string;
    pendidikan_ibu: string;
    penghasilan_ibu: number;
    pekerjaan_ibu: string;
    nohp_ibu: string;
    alamat_orangtua: string;
    daya_listrik: number;
    nama_wali: string;
    nipnrp: string;
    pangkat: string;
    instansi: string;
    pendidikan_wali: string;
    penghasilan_wali: number;
    alamat_wali: string;
    nohp_wali: string;
    nama_sekolah: string;
    kab_sekolah: string;
    prov_sekolah: string;
    thn_masuk: number;
    thn_lulus: number;
    jml_mapel: number;
    nilai: number;
    no_ijazah: number;
    tinggi: number;
    berat: number;
    tekanan_darah: number;
    gol_darah: string;
    user: {
        id: number;
        name: string;
        username: string;
        photo: string | null;
        has_change_password: boolean;
    };
}

interface Props {
    student: Student;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/student/dashboard',
    },
    {
        title: 'My Profile',
        href: '#',
    },
];

export default function StudentDashboard({ student }: Props) {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Student Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                {/* Hero section with profile overview */}
                <StudentProfileHeader student={student} />

                {/* Main content area */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left sidebar with quick stats */}
                    <div className="lg:col-span-1">
                        <StudentProfileStats student={student} />

                        <div className="mt-6">
                            <StudentProfileTimeline student={student} />
                        </div>
                    </div>

                    {/* Main content area */}
                    <div className="lg:col-span-2">
                        <Card className="overflow-hidden border-none shadow-md">
                            <div className="flex items-center justify-between border-b bg-white p-4">
                                <h2 className="text-xl font-semibold">My Profile Information</h2>
                                <Link href={route('student.edit-profile')}>
                                    <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                                        <PencilIcon className="h-4 w-4" />
                                        Edit Profile
                                    </Button>
                                </Link>
                            </div>

                            <CardContent className="p-0">
                                <Tabs defaultValue="personal" className="w-full" onValueChange={(value) => setActiveTab(value)}>
                                    <div className="border-b bg-gray-50">
                                        <div className="overflow-x-auto">
                                            <TabsList className="bg-transparent p-0">
                                                <TabsTrigger
                                                    value="personal"
                                                    className={`rounded-none border-b-2 px-4 py-3 ${
                                                        activeTab === 'personal' ? 'border-indigo-600 text-indigo-600' : 'border-transparent'
                                                    }`}
                                                >
                                                    <UserIcon className="mr-2 h-4 w-4" />
                                                    Personal
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="academic"
                                                    className={`rounded-none border-b-2 px-4 py-3 ${
                                                        activeTab === 'academic' ? 'border-indigo-600 text-indigo-600' : 'border-transparent'
                                                    }`}
                                                >
                                                    <GraduationCapIcon className="mr-2 h-4 w-4" />
                                                    Academic
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="family"
                                                    className={`rounded-none border-b-2 px-4 py-3 ${
                                                        activeTab === 'family' ? 'border-indigo-600 text-indigo-600' : 'border-transparent'
                                                    }`}
                                                >
                                                    <Users2Icon className="mr-2 h-4 w-4" />
                                                    Family
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="achievements"
                                                    className={`rounded-none border-b-2 px-4 py-3 ${
                                                        activeTab === 'achievements' ? 'border-indigo-600 text-indigo-600' : 'border-transparent'
                                                    }`}
                                                >
                                                    <BookOpenIcon className="mr-2 h-4 w-4" />
                                                    Achievements
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="health"
                                                    className={`rounded-none border-b-2 px-4 py-3 ${
                                                        activeTab === 'health' ? 'border-indigo-600 text-indigo-600' : 'border-transparent'
                                                    }`}
                                                >
                                                    <HeartIcon className="mr-2 h-4 w-4" />
                                                    Health
                                                </TabsTrigger>
                                            </TabsList>
                                        </div>
                                    </div>

                                    <TabsContent value="personal" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <StudentProfileSection
                                                title="Personal Details"
                                                icon={<UserIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Full Name', value: student.user.name },
                                                    { label: 'Gender', value: student.jk || 'Not specified' },
                                                    { label: 'Birth Place', value: student.tmp_lahir || 'Not specified' },
                                                    {
                                                        label: 'Birth Date',
                                                        value: student.tgl_lahir ? new Date(student.tgl_lahir).toLocaleDateString() : 'Not specified',
                                                    },
                                                    { label: 'Religion', value: student.agama || 'Not specified' },
                                                    { label: 'Ethnicity', value: student.suku || 'Not specified' },
                                                    { label: 'Nationality', value: student.kewarnegaraan || 'Not specified' },
                                                    { label: 'Phone Number', value: student.nohp || 'Not specified' },
                                                    { label: 'Email', value: student.email || 'Not specified' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Address & Living"
                                                icon={<HomeIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Address', value: student.alamat || 'Not specified', fullWidth: true },
                                                    { label: 'Living Status', value: student.status_huni_rumah || 'Not specified' },
                                                    { label: 'Older Siblings', value: student.jml_kakak?.toString() || '0' },
                                                    { label: 'Younger Siblings', value: student.jml_adik?.toString() || '0' },
                                                ]}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="academic" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <StudentProfileSection
                                                title="Academic Information"
                                                icon={<GraduationCapIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Test Number', value: student.no_test || 'Not specified' },
                                                    { label: 'Admission Path', value: student.jalur_penerimaan || 'Not specified' },
                                                    { label: 'Batch Year', value: student.angkatan?.toString() || 'Not specified' },
                                                    { label: 'Study Program', value: student.prodi || 'Not specified' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Previous Education"
                                                icon={<BookOpenIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'School Name', value: student.nama_sekolah || 'Not specified' },
                                                    { label: 'School District', value: student.kab_sekolah || 'Not specified' },
                                                    { label: 'School Province', value: student.prov_sekolah || 'Not specified' },
                                                    { label: 'Entry Year', value: student.thn_masuk?.toString() || 'Not specified' },
                                                    { label: 'Graduation Year', value: student.thn_lulus?.toString() || 'Not specified' },
                                                    { label: 'Number of Subjects', value: student.jml_mapel?.toString() || 'Not specified' },
                                                    { label: 'Score', value: student.nilai?.toString() || 'Not specified' },
                                                    { label: 'Certificate Number', value: student.no_ijazah?.toString() || 'Not specified' },
                                                ]}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="family" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <StudentProfileSection
                                                title="Father's Information"
                                                icon={<UserIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Name', value: student.nama_ayah || 'Not specified' },
                                                    { label: 'Religion', value: student.agama_ayah || 'Not specified' },
                                                    { label: 'Education', value: student.pendidikan_ayah || 'Not specified' },
                                                    { label: 'Occupation', value: student.pekerjaan_ayah || 'Not specified' },
                                                    {
                                                        label: 'Income',
                                                        value: student.penghasilan_ayah
                                                            ? `Rp ${student.penghasilan_ayah.toLocaleString()}`
                                                            : 'Not specified',
                                                    },
                                                    { label: 'Phone', value: student.nohp_ayah || 'Not specified' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Mother's Information"
                                                icon={<UserIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Name', value: student.nama_ibu || 'Not specified' },
                                                    { label: 'Religion', value: student.agama_ibu || 'Not specified' },
                                                    { label: 'Education', value: student.pendidikan_ibu || 'Not specified' },
                                                    { label: 'Occupation', value: student.pekerjaan_ibu || 'Not specified' },
                                                    {
                                                        label: 'Income',
                                                        value: student.penghasilan_ibu
                                                            ? `Rp ${student.penghasilan_ibu.toLocaleString()}`
                                                            : 'Not specified',
                                                    },
                                                    { label: 'Phone', value: student.nohp_ibu || 'Not specified' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Guardian's Information"
                                                icon={<ShieldIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Name', value: student.nama_wali || 'Not specified' },
                                                    { label: 'NIP/NRP', value: student.nipnrp || 'Not specified' },
                                                    { label: 'Rank', value: student.pangkat || 'Not specified' },
                                                    { label: 'Institution', value: student.instansi || 'Not specified' },
                                                    { label: 'Education', value: student.pendidikan_wali || 'Not specified' },
                                                    {
                                                        label: 'Income',
                                                        value: student.penghasilan_wali
                                                            ? `Rp ${student.penghasilan_wali.toLocaleString()}`
                                                            : 'Not specified',
                                                    },
                                                    { label: 'Phone', value: student.nohp_wali || 'Not specified' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Parents' Residence"
                                                icon={<HomeIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Address', value: student.alamat_orangtua || 'Not specified', fullWidth: true },
                                                    {
                                                        label: 'Electricity Power',
                                                        value: student.daya_listrik ? `${student.daya_listrik} Watt` : 'Not specified',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="achievements" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <StudentProfileSection
                                                title="Academic Achievements"
                                                icon={<BadgeIcon className="h-5 w-5" />}
                                                textContent={student.akademik || 'No academic achievements recorded.'}
                                            />

                                            <StudentProfileSection
                                                title="Non-Academic Achievements"
                                                icon={<BadgeIcon className="h-5 w-5" />}
                                                textContent={student.non_akademik || 'No non-academic achievements recorded.'}
                                            />

                                            <StudentProfileSection
                                                title="Sports"
                                                icon={<BadgeIcon className="h-5 w-5" />}
                                                textContent={student.olahraga || 'No sports activities recorded.'}
                                            />

                                            <StudentProfileSection
                                                title="Arts"
                                                icon={<BadgeIcon className="h-5 w-5" />}
                                                textContent={student.kesenian || 'No arts activities recorded.'}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="health" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="md:col-span-2">
                                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <div className="rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center shadow-sm">
                                                        <div className="text-3xl font-bold text-indigo-600">{student.tinggi || '-'}</div>
                                                        <div className="mt-1 text-sm font-medium text-indigo-800">Height (cm)</div>
                                                    </div>
                                                    <div className="rounded-lg bg-gradient-to-br from-purple-50 to-pink-50 p-6 text-center shadow-sm">
                                                        <div className="text-3xl font-bold text-pink-600">{student.berat || '-'}</div>
                                                        <div className="mt-1 text-sm font-medium text-pink-800">Weight (kg)</div>
                                                    </div>
                                                    <div className="rounded-lg bg-gradient-to-br from-green-50 to-teal-50 p-6 text-center shadow-sm">
                                                        <div className="text-3xl font-bold text-teal-600">{student.tekanan_darah || '-'}</div>
                                                        <div className="mt-1 text-sm font-medium text-teal-800">Blood Pressure</div>
                                                    </div>
                                                    <div className="rounded-lg bg-gradient-to-br from-red-50 to-orange-50 p-6 text-center shadow-sm">
                                                        <div className="text-3xl font-bold text-red-600">{student.gol_darah || '-'}</div>
                                                        <div className="mt-1 text-sm font-medium text-red-800">Blood Type</div>
                                                    </div>
                                                </div>

                                                {student.tinggi && student.berat && (
                                                    <div className="mt-6 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-6 shadow-sm">
                                                        <h3 className="mb-4 text-lg font-semibold text-indigo-800">Body Mass Index (BMI)</h3>
                                                        <div className="flex items-center">
                                                            <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200">
                                                                {(() => {
                                                                    const bmi = student.berat / ((student.tinggi / 100) * (student.tinggi / 100));
                                                                    let bmiClass = 'bg-green-500';
                                                                    let bmiWidth = 50;

                                                                    if (bmi < 18.5) {
                                                                        bmiClass = 'bg-blue-500';
                                                                        bmiWidth = 25;
                                                                    } else if (bmi >= 25) {
                                                                        bmiClass = 'bg-orange-500';
                                                                        bmiWidth = 75;
                                                                    }

                                                                    if (bmi >= 30) {
                                                                        bmiClass = 'bg-red-500';
                                                                        bmiWidth = 90;
                                                                    }

                                                                    return (
                                                                        <div className={`h-full ${bmiClass}`} style={{ width: `${bmiWidth}%` }}></div>
                                                                    );
                                                                })()}
                                                            </div>
                                                        </div>
                                                        <div className="mt-4 flex justify-between text-sm">
                                                            <span className="font-medium text-blue-700">Underweight</span>
                                                            <span className="font-medium text-green-700">Normal</span>
                                                            <span className="font-medium text-orange-700">Overweight</span>
                                                            <span className="font-medium text-red-700">Obese</span>
                                                        </div>
                                                        <div className="mt-6 text-center">
                                                            <span className="text-2xl font-bold text-indigo-700">
                                                                {(student.berat / ((student.tinggi / 100) * (student.tinggi / 100))).toFixed(2)}
                                                            </span>
                                                            <p className="mt-2 text-sm text-gray-600">
                                                                {(() => {
                                                                    const bmi = student.berat / ((student.tinggi / 100) * (student.tinggi / 100));
                                                                    if (bmi < 18.5)
                                                                        return 'You are underweight. Consider consulting with a nutritionist.';
                                                                    if (bmi < 25) return 'Your BMI is in the normal range. Keep up the good work!';
                                                                    if (bmi < 30)
                                                                        return 'You are overweight. Consider a balanced diet and regular exercise.';
                                                                    return 'You are in the obese range. Please consult with a healthcare professional.';
                                                                })()}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
