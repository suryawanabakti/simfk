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
        title: 'Profil Saya',
        href: '#',
    },
];

export default function StudentDashboard({ student }: Props) {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard Mahasiswa" />

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
                                <h2 className="text-xl font-semibold">Informasi Profil Saya</h2>
                                <Link href={route('student.edit-profile')}>
                                    <Button className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                                        <PencilIcon className="h-4 w-4" />
                                        Edit Profil
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
                                                        activeTab === 'personal' ? 'border-rose-500 text-rose-500' : 'border-transparent'
                                                    }`}
                                                >
                                                    <UserIcon className="mr-2 h-4 w-4" />
                                                    Data Pribadi
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="academic"
                                                    className={`rounded-none border-b-2 px-4 py-3 ${
                                                        activeTab === 'academic' ? 'border-rose-500 text-rose-500' : 'border-transparent'
                                                    }`}
                                                >
                                                    <GraduationCapIcon className="mr-2 h-4 w-4" />
                                                    Akademik
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="family"
                                                    className={`rounded-none border-b-2 px-4 py-3 ${
                                                        activeTab === 'family' ? 'border-rose-500 text-rose-500' : 'border-transparent'
                                                    }`}
                                                >
                                                    <Users2Icon className="mr-2 h-4 w-4" />
                                                    Keluarga
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="achievements"
                                                    className={`rounded-none border-b-2 px-4 py-3 ${
                                                        activeTab === 'achievements' ? 'border-rose-500 text-rose-500' : 'border-transparent'
                                                    }`}
                                                >
                                                    <BookOpenIcon className="mr-2 h-4 w-4" />
                                                    Prestasi
                                                </TabsTrigger>
                                                <TabsTrigger
                                                    value="health"
                                                    className={`rounded-none border-b-2 px-4 py-3 ${
                                                        activeTab === 'health' ? 'border-rose-500 text-rose-500' : 'border-transparent'
                                                    }`}
                                                >
                                                    <HeartIcon className="mr-2 h-4 w-4" />
                                                    Kesehatan
                                                </TabsTrigger>
                                            </TabsList>
                                        </div>
                                    </div>

                                    <TabsContent value="personal" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <StudentProfileSection
                                                title="Data Pribadi"
                                                icon={<UserIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Nama Lengkap', value: student.user.name },
                                                    { label: 'Jenis Kelamin', value: student.jk || 'Belum diisi' },
                                                    { label: 'Tempat Lahir', value: student.tmp_lahir || 'Belum diisi' },
                                                    {
                                                        label: 'Tanggal Lahir',
                                                        value: student.tgl_lahir ? new Date(student.tgl_lahir).toLocaleDateString() : 'Belum diisi',
                                                    },
                                                    { label: 'Agama', value: student.agama || 'Belum diisi' },
                                                    { label: 'Suku', value: student.suku || 'Belum diisi' },
                                                    { label: 'Kewarganegaraan', value: student.kewarnegaraan || 'Belum diisi' },
                                                    { label: 'Nomor HP', value: student.nohp || 'Belum diisi' },
                                                    { label: 'Email', value: student.email || 'Belum diisi' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Alamat & Tempat Tinggal"
                                                icon={<HomeIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Alamat', value: student.alamat || 'Belum diisi', fullWidth: true },
                                                    { label: 'Status Tempat Tinggal', value: student.status_huni_rumah || 'Belum diisi' },
                                                    { label: 'Jumlah Kakak', value: student.jml_kakak?.toString() || '0' },
                                                    { label: 'Jumlah Adik', value: student.jml_adik?.toString() || '0' },
                                                ]}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="academic" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <StudentProfileSection
                                                title="Informasi Akademik"
                                                icon={<GraduationCapIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Nomor Tes', value: student.no_test || 'Belum diisi' },
                                                    { label: 'Jalur Penerimaan', value: student.jalur_penerimaan || 'Belum diisi' },
                                                    { label: 'Angkatan', value: student.angkatan?.toString() || 'Belum diisi' },
                                                    { label: 'Program Studi', value: student.prodi || 'Belum diisi' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Pendidikan Sebelumnya"
                                                icon={<BookOpenIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Nama Sekolah', value: student.nama_sekolah || 'Belum diisi' },
                                                    { label: 'Kabupaten Sekolah', value: student.kab_sekolah || 'Belum diisi' },
                                                    { label: 'Provinsi Sekolah', value: student.prov_sekolah || 'Belum diisi' },
                                                    { label: 'Tahun Masuk', value: student.thn_masuk?.toString() || 'Belum diisi' },
                                                    { label: 'Tahun Lulus', value: student.thn_lulus?.toString() || 'Belum diisi' },
                                                    { label: 'Jumlah Mata Pelajaran', value: student.jml_mapel?.toString() || 'Belum diisi' },
                                                    { label: 'Nilai', value: student.nilai?.toString() || 'Belum diisi' },
                                                    { label: 'Nomor Ijazah', value: student.no_ijazah?.toString() || 'Belum diisi' },
                                                ]}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="family" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <StudentProfileSection
                                                title="Informasi Ayah"
                                                icon={<UserIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Nama', value: student.nama_ayah || 'Belum diisi' },
                                                    { label: 'Agama', value: student.agama_ayah || 'Belum diisi' },
                                                    { label: 'Pendidikan', value: student.pendidikan_ayah || 'Belum diisi' },
                                                    { label: 'Pekerjaan', value: student.pekerjaan_ayah || 'Belum diisi' },
                                                    {
                                                        label: 'Penghasilan',
                                                        value: student.penghasilan_ayah
                                                            ? `Rp ${student.penghasilan_ayah.toLocaleString()}`
                                                            : 'Belum diisi',
                                                    },
                                                    { label: 'Nomor HP', value: student.nohp_ayah || 'Belum diisi' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Informasi Ibu"
                                                icon={<UserIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Nama', value: student.nama_ibu || 'Belum diisi' },
                                                    { label: 'Agama', value: student.agama_ibu || 'Belum diisi' },
                                                    { label: 'Pendidikan', value: student.pendidikan_ibu || 'Belum diisi' },
                                                    { label: 'Pekerjaan', value: student.pekerjaan_ibu || 'Belum diisi' },
                                                    {
                                                        label: 'Penghasilan',
                                                        value: student.penghasilan_ibu
                                                            ? `Rp ${student.penghasilan_ibu.toLocaleString()}`
                                                            : 'Belum diisi',
                                                    },
                                                    { label: 'Nomor HP', value: student.nohp_ibu || 'Belum diisi' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Informasi Wali"
                                                icon={<ShieldIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Nama', value: student.nama_wali || 'Belum diisi' },
                                                    { label: 'NIP/NRP', value: student.nipnrp || 'Belum diisi' },
                                                    { label: 'Pangkat', value: student.pangkat || 'Belum diisi' },
                                                    { label: 'Instansi', value: student.instansi || 'Belum diisi' },
                                                    { label: 'Pendidikan', value: student.pendidikan_wali || 'Belum diisi' },
                                                    {
                                                        label: 'Penghasilan',
                                                        value: student.penghasilan_wali
                                                            ? `Rp ${student.penghasilan_wali.toLocaleString()}`
                                                            : 'Belum diisi',
                                                    },
                                                    { label: 'Nomor HP', value: student.nohp_wali || 'Belum diisi' },
                                                ]}
                                            />

                                            <StudentProfileSection
                                                title="Tempat Tinggal Orang Tua"
                                                icon={<HomeIcon className="h-5 w-5" />}
                                                items={[
                                                    { label: 'Alamat', value: student.alamat_orangtua || 'Belum diisi', fullWidth: true },
                                                    {
                                                        label: 'Daya Listrik',
                                                        value: student.daya_listrik ? `${student.daya_listrik} Watt` : 'Belum diisi',
                                                    },
                                                ]}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="achievements" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <StudentProfileSection
                                                title="Prestasi Akademik"
                                                icon={<BadgeIcon className="h-5 w-5" />}
                                                textContent={student.akademik || 'Belum ada prestasi akademik yang tercatat.'}
                                            />

                                            <StudentProfileSection
                                                title="Prestasi Non-Akademik"
                                                icon={<BadgeIcon className="h-5 w-5" />}
                                                textContent={student.non_akademik || 'Belum ada prestasi non-akademik yang tercatat.'}
                                            />

                                            <StudentProfileSection
                                                title="Olahraga"
                                                icon={<BadgeIcon className="h-5 w-5" />}
                                                textContent={student.olahraga || 'Belum ada aktivitas olahraga yang tercatat.'}
                                            />

                                            <StudentProfileSection
                                                title="Kesenian"
                                                icon={<BadgeIcon className="h-5 w-5" />}
                                                textContent={student.kesenian || 'Belum ada aktivitas kesenian yang tercatat.'}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="health" className="p-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div className="md:col-span-2">
                                                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                                                    <div className="rounded-lg bg-gradient-to-br from-rose-50 to-pink-50 p-6 text-center shadow-sm">
                                                        <div className="text-3xl font-bold text-rose-600">{student.tinggi || '-'}</div>
                                                        <div className="mt-1 text-sm font-medium text-rose-800">Tinggi Badan (cm)</div>
                                                    </div>
                                                    <div className="rounded-lg bg-gradient-to-br from-pink-50 to-rose-50 p-6 text-center shadow-sm">
                                                        <div className="text-3xl font-bold text-pink-600">{student.berat || '-'}</div>
                                                        <div className="mt-1 text-sm font-medium text-pink-800">Berat Badan (kg)</div>
                                                    </div>
                                                    <div className="rounded-lg bg-gradient-to-br from-rose-50 to-red-50 p-6 text-center shadow-sm">
                                                        <div className="text-3xl font-bold text-rose-600">{student.tekanan_darah || '-'}</div>
                                                        <div className="mt-1 text-sm font-medium text-rose-800">Tekanan Darah</div>
                                                    </div>
                                                    <div className="rounded-lg bg-gradient-to-br from-red-50 to-rose-50 p-6 text-center shadow-sm">
                                                        <div className="text-3xl font-bold text-red-600">{student.gol_darah || '-'}</div>
                                                        <div className="mt-1 text-sm font-medium text-red-800">Golongan Darah</div>
                                                    </div>
                                                </div>

                                                {student.tinggi && student.berat && (
                                                    <div className="mt-6 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 p-6 shadow-sm">
                                                        <h3 className="mb-4 text-lg font-semibold text-rose-800">Indeks Massa Tubuh (IMT)</h3>
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
                                                            <span className="font-medium text-blue-700">Kurus</span>
                                                            <span className="font-medium text-green-700">Normal</span>
                                                            <span className="font-medium text-orange-700">Kelebihan Berat</span>
                                                            <span className="font-medium text-red-700">Obesitas</span>
                                                        </div>
                                                        <div className="mt-6 text-center">
                                                            <span className="text-2xl font-bold text-rose-700">
                                                                {(student.berat / ((student.tinggi / 100) * (student.tinggi / 100))).toFixed(2)}
                                                            </span>
                                                            <p className="mt-2 text-sm text-gray-600">
                                                                {(() => {
                                                                    const bmi = student.berat / ((student.tinggi / 100) * (student.tinggi / 100));
                                                                    if (bmi < 18.5)
                                                                        return 'Anda kekurangan berat badan. Pertimbangkan untuk berkonsultasi dengan ahli gizi.';
                                                                    if (bmi < 25) return 'IMT Anda dalam kisaran normal. Pertahankan pola hidup sehat!';
                                                                    if (bmi < 30)
                                                                        return 'Anda kelebihan berat badan. Pertimbangkan pola makan seimbang dan olahraga teratur.';
                                                                    return 'Anda dalam kisaran obesitas. Silakan konsultasikan dengan tenaga kesehatan.';
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
