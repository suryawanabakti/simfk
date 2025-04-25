'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { AlertCircleIcon, ArrowLeftIcon, BookOpenIcon, GraduationCapIcon, HeartIcon, SaveIcon, UserIcon, Users2Icon } from 'lucide-react';
import { useState } from 'react';

// Import form sections
import AcademicInfoForm from '@/components/Students/FormSections/AcademicInfoForm';
import AccountForm from '@/components/Students/FormSections/AccountForm';
import AchievementsForm from '@/components/Students/FormSections/AchievementsForm';
import EducationForm from '@/components/Students/FormSections/EducationForm';
import FamilyInfoForm from '@/components/Students/FormSections/FamilyInfoForm';
import GuardianForm from '@/components/Students/FormSections/GuardianForm';
import HealthForm from '@/components/Students/FormSections/HealthForm';
import PersonalInfoForm from '@/components/Students/FormSections/PersonalInfoForm';

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
    jalurOptions: string[];
    prodiOptions: string[];
    jkOptions: string[];
    agamaOptions: string[];
    statusHuniOptions: string[];
    pendidikanOptions: string[];
    golDarahOptions: string[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/student/dashboard',
    },
    {
        title: 'Edit Profile',
        href: '#',
    },
];

export default function EditProfile({
    student,
    jalurOptions,
    prodiOptions,
    jkOptions,
    agamaOptions,
    statusHuniOptions,
    pendidikanOptions,
    golDarahOptions,
}: Props) {
    const [activeTab, setActiveTab] = useState('personal');

    const { data, setData, put, processing, errors } = useForm({
        user: {
            name: student.user.name,
            photo: student.user.photo,
        },
        photo: null as File | null,
        email: student.email || '',
        no_test: student.no_test || '',
        jalur_penerimaan: student.jalur_penerimaan || '',
        angkatan: student.angkatan || '',
        prodi: student.prodi || '',
        tmp_lahir: student.tmp_lahir || '',
        tgl_lahir: student.tgl_lahir || '',
        kab_lahir: student.kab_lahir || '',
        prov_lahir: student.prov_lahir || '',
        jk: student.jk || '',
        alamat: student.alamat || '',
        nohp: student.nohp || '',
        agama: student.agama || '',
        suku: student.suku || '',
        kewarnegaraan: student.kewarnegaraan || '',
        jml_kakak: student.jml_kakak || '',
        jml_adik: student.jml_adik || '',
        status_huni_rumah: student.status_huni_rumah || '',
        akademik: student.akademik || '',
        non_akademik: student.non_akademik || '',
        olahraga: student.olahraga || '',
        kesenian: student.kesenian || '',
        nama_ayah: student.nama_ayah || '',
        agama_ayah: student.agama_ayah || '',
        pendidikan_ayah: student.pendidikan_ayah || '',
        penghasilan_ayah: student.penghasilan_ayah || '',
        pekerjaan_ayah: student.pekerjaan_ayah || '',
        nohp_ayah: student.nohp_ayah || '',
        nama_ibu: student.nama_ibu || '',
        agama_ibu: student.agama_ibu || '',
        pendidikan_ibu: student.pendidikan_ibu || '',
        penghasilan_ibu: student.penghasilan_ibu || '',
        pekerjaan_ibu: student.pekerjaan_ibu || '',
        nohp_ibu: student.nohp_ibu || '',
        alamat_orangtua: student.alamat_orangtua || '',
        daya_listrik: student.daya_listrik || '',
        nama_wali: student.nama_wali || '',
        nipnrp: student.nipnrp || '',
        pangkat: student.pangkat || '',
        instansi: student.instansi || '',
        pendidikan_wali: student.pendidikan_wali || '',
        penghasilan_wali: student.penghasilan_wali || '',
        alamat_wali: student.alamat_wali || '',
        nohp_wali: student.nohp_wali || '',
        nama_sekolah: student.nama_sekolah || '',
        kab_sekolah: student.kab_sekolah || '',
        prov_sekolah: student.prov_sekolah || '',
        thn_masuk: student.thn_masuk || '',
        thn_lulus: student.thn_lulus || '',
        jml_mapel: student.jml_mapel || '',
        nilai: student.nilai || '',
        no_ijazah: student.no_ijazah || '',
        tinggi: student.tinggi || '',
        berat: student.berat || '',
        tekanan_darah: student.tekanan_darah || '',
        gol_darah: student.gol_darah || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('student.update-profile', student.id), {
            onSuccess: () => {
                // Redirect to dashboard on success
            },
        });
    };

    const handleDataChange = (key: string, value: any) => {
        setData(key, value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Profile" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link href={route('student.dashboard')}>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <ArrowLeftIcon className="h-4 w-4" />
                                Back to Dashboard
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold">Edit Your Profile</h1>
                    </div>
                    <Button
                        type="submit"
                        form="student-profile-form"
                        disabled={processing}
                        className="bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700"
                    >
                        <SaveIcon className="mr-2 h-4 w-4" />
                        {processing ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>

                {Object.keys(errors).length > 0 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <AlertCircleIcon className="h-5 w-5 text-red-400" />
                            </div>
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-red-800">There were errors with your submission</h3>
                                <div className="mt-2 text-sm text-red-700">
                                    <ul className="list-disc space-y-1 pl-5">
                                        {Object.entries(errors).map(([key, value]) => (
                                            <li key={key}>
                                                {key}: {value}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <form id="student-profile-form" onSubmit={handleSubmit}>
                    <Card className="overflow-hidden border-none shadow-lg">
                        <CardHeader className="bg-gradient-to-r from-rose-600 to-purple-600 py-4">
                            <CardTitle className="text-white">Update Your Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Tabs defaultValue="personal" className="w-full" onValueChange={(value) => setActiveTab(value)}>
                                <div className="border-b bg-gray-50">
                                    <div className="overflow-x-auto">
                                        <TabsList className="bg-transparent p-0">
                                            <TabsTrigger
                                                value="account"
                                                className={`rounded-none border-b-2 px-4 py-3 ${
                                                    activeTab === 'account' ? 'border-rose-600 text-rose-600' : 'border-transparent'
                                                }`}
                                            >
                                                <UserIcon className="mr-2 h-4 w-4" />
                                                Account
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="personal"
                                                className={`rounded-none border-b-2 px-4 py-3 ${
                                                    activeTab === 'personal' ? 'border-rose-600 text-rose-600' : 'border-transparent'
                                                }`}
                                            >
                                                <UserIcon className="mr-2 h-4 w-4" />
                                                Personal
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="academic"
                                                className={`rounded-none border-b-2 px-4 py-3 ${
                                                    activeTab === 'academic' ? 'border-rose-600 text-rose-600' : 'border-transparent'
                                                }`}
                                            >
                                                <GraduationCapIcon className="mr-2 h-4 w-4" />
                                                Academic
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="family"
                                                className={`rounded-none border-b-2 px-4 py-3 ${
                                                    activeTab === 'family' ? 'border-rose-600 text-rose-600' : 'border-transparent'
                                                }`}
                                            >
                                                <Users2Icon className="mr-2 h-4 w-4" />
                                                Family
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="achievements"
                                                className={`rounded-none border-b-2 px-4 py-3 ${
                                                    activeTab === 'achievements' ? 'border-rose-600 text-rose-600' : 'border-transparent'
                                                }`}
                                            >
                                                <BookOpenIcon className="mr-2 h-4 w-4" />
                                                Achievements
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="health"
                                                className={`rounded-none border-b-2 px-4 py-3 ${
                                                    activeTab === 'health' ? 'border-rose-600 text-rose-600' : 'border-transparent'
                                                }`}
                                            >
                                                <HeartIcon className="mr-2 h-4 w-4" />
                                                Health
                                            </TabsTrigger>
                                        </TabsList>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <TabsContent value="account" className="m-0">
                                        <AccountForm data={data} setData={handleDataChange} errors={errors} isEdit={true} />
                                    </TabsContent>

                                    <TabsContent value="personal" className="m-0">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <AcademicInfoForm
                                                data={data}
                                                setData={handleDataChange}
                                                errors={errors}
                                                options={{ jalurOptions, prodiOptions }}
                                            />
                                            <PersonalInfoForm
                                                data={data}
                                                setData={handleDataChange}
                                                errors={errors}
                                                options={{ jkOptions, agamaOptions, statusHuniOptions }}
                                            />
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="family" className="m-0">
                                        <FamilyInfoForm
                                            data={data}
                                            setData={handleDataChange}
                                            errors={errors}
                                            options={{ agamaOptions, pendidikanOptions }}
                                        />
                                    </TabsContent>

                                    <TabsContent value="academic" className="m-0">
                                        <EducationForm data={data} setData={handleDataChange} errors={errors} />
                                    </TabsContent>

                                    <TabsContent value="achievements" className="m-0">
                                        <AchievementsForm data={data} setData={handleDataChange} errors={errors} />
                                    </TabsContent>

                                    <TabsContent value="guardian" className="m-0">
                                        <GuardianForm data={data} setData={handleDataChange} errors={errors} options={{ pendidikanOptions }} />
                                    </TabsContent>

                                    <TabsContent value="health" className="m-0">
                                        <HealthForm data={data} setData={handleDataChange} errors={errors} options={{ golDarahOptions }} />
                                    </TabsContent>
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
