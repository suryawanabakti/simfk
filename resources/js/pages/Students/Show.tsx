import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowLeftIcon,
    BookOpenIcon,
    BriefcaseIcon,
    BuildingIcon,
    CalendarIcon,
    DollarSignIcon,
    GraduationCapIcon,
    HeartIcon,
    HomeIcon,
    KeyIcon,
    MapPinIcon,
    PencilIcon,
    PhoneIcon,
    UserIcon,
} from 'lucide-react';

// Import components
import StudentHeader from '@/components/Students/StudentHeader';
import StudentTabs from '@/components/Students/StudentTabs';

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
        href: '/dashboard',
    },
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Student Details',
        href: '#',
    },
];

export default function Show({ student }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Student: ${student.user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-2">
                        <Link href={route('students.index')}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <ArrowLeftIcon className="h-4 w-4" />
                                Back
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Student Details</h1>
                    </div>
                    <div className="flex gap-2">
                        <Link href={route('students.edit', student.id)}>
                            <Button className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                                <PencilIcon className="h-4 w-4" />
                                Edit Student
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Student Profile Header */}
                <StudentHeader student={student} />

                {/* User Account Information */}
                <Card className="shadow-md">
                    <CardHeader className="border-b bg-gray-50">
                        <CardTitle className="flex items-center gap-2 text-indigo-700">
                            <KeyIcon className="h-5 w-5" />
                            User Account Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">Username</p>
                                <p className="font-mono">{student.user.username || '-'}</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">Password Status</p>
                                <div>
                                    {student.user.has_change_password ? (
                                        <Badge className="bg-green-100 text-green-800">Changed</Badge>
                                    ) : (
                                        <Badge className="bg-yellow-100 text-yellow-800">Default</Badge>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-500">Actions</p>
                                <form action={route('users.reset-password', student.user.id)} method="POST">
                                    <input type="hidden" name="_token" value={usePage().props.csrf_token} />
                                    <Button type="submit" variant="outline" size="sm" className="flex items-center gap-1">
                                        <KeyIcon className="h-4 w-4" />
                                        Reset Password
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabbed Information */}
                <StudentTabs defaultTab="personal">
                    {/* Personal Information Tab */}
                    <TabsContent value="personal">
                        <Card className="shadow-md">
                            <CardHeader className="border-b bg-gray-50">
                                <CardTitle className="flex items-center gap-2 text-indigo-700">
                                    <UserIcon className="h-5 w-5" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Birth Place</p>
                                        <p className="flex items-center gap-2">
                                            <MapPinIcon className="h-4 w-4 text-indigo-500" />
                                            {student.tmp_lahir || '-'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Birth Date</p>
                                        <p className="flex items-center gap-2">
                                            <CalendarIcon className="h-4 w-4 text-indigo-500" />
                                            {student.tgl_lahir ? new Date(student.tgl_lahir).toLocaleDateString() : '-'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Gender</p>
                                        <p>{student.jk || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Religion</p>
                                        <p>{student.agama || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Ethnicity</p>
                                        <p>{student.suku || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Nationality</p>
                                        <p>{student.kewarnegaraan || '-'}</p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Siblings</p>
                                        <p>
                                            {student.jml_kakak > 0 || student.jml_adik > 0 ? (
                                                <>
                                                    {student.jml_kakak} older, {student.jml_adik} younger
                                                </>
                                            ) : (
                                                '-'
                                            )}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-500">Living Status</p>
                                        <p>{student.status_huni_rumah || '-'}</p>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <p className="text-sm font-medium text-gray-500">Address</p>
                                    <p className="mt-2 flex items-start gap-2">
                                        <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-indigo-500" />
                                        <span>{student.alamat || '-'}</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Family Information Tab */}
                    <TabsContent value="family">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card className="shadow-md">
                                <CardHeader className="border-b bg-gray-50">
                                    <CardTitle className="flex items-center gap-2 text-blue-700">
                                        <UserIcon className="h-5 w-5" />
                                        Father's Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                                                <UserIcon className="h-6 w-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{student.nama_ayah || 'Not Specified'}</h3>
                                                <p className="text-sm text-gray-500">{student.agama_ayah || '-'}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Education</p>
                                                <p>{student.pendidikan_ayah || '-'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Occupation</p>
                                                <p className="flex items-center gap-2">
                                                    <BriefcaseIcon className="h-4 w-4 text-blue-500" />
                                                    {student.pekerjaan_ayah || '-'}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Income</p>
                                                <p className="flex items-center gap-2">
                                                    <DollarSignIcon className="h-4 w-4 text-blue-500" />
                                                    {student.penghasilan_ayah ? `Rp ${student.penghasilan_ayah.toLocaleString()}` : '-'}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                                <p className="flex items-center gap-2">
                                                    <PhoneIcon className="h-4 w-4 text-blue-500" />
                                                    {student.nohp_ayah || '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md">
                                <CardHeader className="border-b bg-gray-50">
                                    <CardTitle className="flex items-center gap-2 text-pink-700">
                                        <UserIcon className="h-5 w-5" />
                                        Mother's Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                                                <UserIcon className="h-6 w-6 text-pink-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{student.nama_ibu || 'Not Specified'}</h3>
                                                <p className="text-sm text-gray-500">{student.agama_ibu || '-'}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Education</p>
                                                <p>{student.pendidikan_ibu || '-'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Occupation</p>
                                                <p className="flex items-center gap-2">
                                                    <BriefcaseIcon className="h-4 w-4 text-pink-500" />
                                                    {student.pekerjaan_ibu || '-'}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Income</p>
                                                <p className="flex items-center gap-2">
                                                    <DollarSignIcon className="h-4 w-4 text-pink-500" />
                                                    {student.penghasilan_ibu ? `Rp ${student.penghasilan_ibu.toLocaleString()}` : '-'}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                                <p className="flex items-center gap-2">
                                                    <PhoneIcon className="h-4 w-4 text-pink-500" />
                                                    {student.nohp_ibu || '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md md:col-span-2">
                                <CardHeader className="border-b bg-gray-50">
                                    <CardTitle className="flex items-center gap-2 text-purple-700">
                                        <HomeIcon className="h-5 w-5" />
                                        Parents' Residence
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-500">Address</p>
                                            <p className="flex items-start gap-2">
                                                <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-purple-500" />
                                                <span>{student.alamat_orangtua || '-'}</span>
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-500">Electricity Power</p>
                                            <p className="flex items-center gap-2">{student.daya_listrik ? `${student.daya_listrik} Watt` : '-'}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Education Tab */}
                    <TabsContent value="education">
                        <Card className="shadow-md">
                            <CardHeader className="border-b bg-gray-50">
                                <CardTitle className="flex items-center gap-2 text-green-700">
                                    <GraduationCapIcon className="h-5 w-5" />
                                    Education Background
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <div className="flex-1">
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                                <BuildingIcon className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{student.nama_sekolah || 'School Not Specified'}</h3>
                                                <p className="text-sm text-gray-500">
                                                    {student.kab_sekolah && student.prov_sekolah
                                                        ? `${student.kab_sekolah}, ${student.prov_sekolah}`
                                                        : student.kab_sekolah || student.prov_sekolah || '-'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Entry Year</p>
                                                <p>{student.thn_masuk || '-'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Graduation Year</p>
                                                <p>{student.thn_lulus || '-'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Number of Subjects</p>
                                                <p>{student.jml_mapel || '-'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Score</p>
                                                <p>{student.nilai || '-'}</p>
                                            </div>
                                            <div className="space-y-1 md:col-span-2">
                                                <p className="text-sm font-medium text-gray-500">Certificate Number</p>
                                                <p className="font-mono">{student.no_ijazah || '-'}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Achievements Tab */}
                    <TabsContent value="achievements">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <Card className="shadow-md">
                                <CardHeader className="border-b bg-gray-50">
                                    <CardTitle className="flex items-center gap-2 text-amber-700">
                                        <BookOpenIcon className="h-5 w-5" />
                                        Academic Achievements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="prose max-w-none">
                                        {student.akademik ? (
                                            <div className="whitespace-pre-line">{student.akademik}</div>
                                        ) : (
                                            <p className="text-gray-500 italic">No academic achievements recorded</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md">
                                <CardHeader className="border-b bg-gray-50">
                                    <CardTitle className="flex items-center gap-2 text-purple-700">
                                        <BookOpenIcon className="h-5 w-5" />
                                        Non-Academic Achievements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="prose max-w-none">
                                        {student.non_akademik ? (
                                            <div className="whitespace-pre-line">{student.non_akademik}</div>
                                        ) : (
                                            <p className="text-gray-500 italic">No non-academic achievements recorded</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md">
                                <CardHeader className="border-b bg-gray-50">
                                    <CardTitle className="flex items-center gap-2 text-blue-700">
                                        <BookOpenIcon className="h-5 w-5" />
                                        Sports
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="prose max-w-none">
                                        {student.olahraga ? (
                                            <div className="whitespace-pre-line">{student.olahraga}</div>
                                        ) : (
                                            <p className="text-gray-500 italic">No sports activities recorded</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md">
                                <CardHeader className="border-b bg-gray-50">
                                    <CardTitle className="flex items-center gap-2 text-pink-700">
                                        <BookOpenIcon className="h-5 w-5" />
                                        Arts
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="prose max-w-none">
                                        {student.kesenian ? (
                                            <div className="whitespace-pre-line">{student.kesenian}</div>
                                        ) : (
                                            <p className="text-gray-500 italic">No arts activities recorded</p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Guardian Tab */}
                    <TabsContent value="guardian">
                        <Card className="shadow-md">
                            <CardHeader className="border-b bg-gray-50">
                                <CardTitle className="flex items-center gap-2 text-rose-700">
                                    <HomeIcon className="h-5 w-5" />
                                    Guardian Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="flex flex-col gap-6 md:flex-row">
                                    <div className="flex-1">
                                        <div className="mb-6 flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                                                <UserIcon className="h-6 w-6 text-rose-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium">{student.nama_wali || 'Guardian Not Specified'}</h3>
                                                <p className="text-sm text-gray-500">{student.instansi ? `${student.instansi}` : '-'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">NIP/NRP</p>
                                                <p className="font-mono">{student.nipnrp || '-'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Rank</p>
                                                <p>{student.pangkat || '-'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Education</p>
                                                <p>{student.pendidikan_wali || '-'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Income</p>
                                                <p className="flex items-center gap-2">
                                                    <DollarSignIcon className="h-4 w-4 text-rose-500" />
                                                    {student.penghasilan_wali ? `Rp ${student.penghasilan_wali.toLocaleString()}` : '-'}
                                                </p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium text-gray-500">Phone</p>
                                                <p className="flex items-center gap-2">
                                                    <PhoneIcon className="h-4 w-4 text-rose-500" />
                                                    {student.nohp_wali || '-'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-6 space-y-2">
                                            <p className="text-sm font-medium text-gray-500">Address</p>
                                            <p className="flex items-start gap-2">
                                                <MapPinIcon className="mt-0.5 h-5 w-5 flex-shrink-0 text-rose-500" />
                                                <span>{student.alamat_wali || '-'}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Health Tab */}
                    <TabsContent value="health">
                        <Card className="shadow-md">
                            <CardHeader className="border-b bg-gray-50">
                                <CardTitle className="flex items-center gap-2 text-teal-700">
                                    <HeartIcon className="h-5 w-5" />
                                    Health Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                                    <div className="flex flex-col items-center justify-center rounded-lg bg-teal-50 p-4">
                                        <div className="mb-1 text-3xl font-bold text-teal-600">{student.tinggi || '-'}</div>
                                        <div className="text-sm text-teal-700">Height (cm)</div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center rounded-lg bg-teal-50 p-4">
                                        <div className="mb-1 text-3xl font-bold text-teal-600">{student.berat || '-'}</div>
                                        <div className="text-sm text-teal-700">Weight (kg)</div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center rounded-lg bg-teal-50 p-4">
                                        <div className="mb-1 text-3xl font-bold text-teal-600">{student.tekanan_darah || '-'}</div>
                                        <div className="text-sm text-teal-700">Blood Pressure</div>
                                    </div>

                                    <div className="flex flex-col items-center justify-center rounded-lg bg-teal-50 p-4">
                                        <div className="mb-1 text-3xl font-bold text-teal-600">{student.gol_darah || '-'}</div>
                                        <div className="text-sm text-teal-700">Blood Type</div>
                                    </div>
                                </div>

                                {student.tinggi && student.berat ? (
                                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
                                        <p className="text-sm font-medium text-gray-700">
                                            BMI (Body Mass Index): {(student.berat / ((student.tinggi / 100) * (student.tinggi / 100))).toFixed(2)}
                                        </p>
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </StudentTabs>
            </div>
        </AppLayout>
    );
}
