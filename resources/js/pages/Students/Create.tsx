'use client';

import type React from 'react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeftIcon } from 'lucide-react';

// Import components
import AcademicInfoForm from '@/components/Students/FormSections/AcademicInfoForm';
import AccountForm from '@/components/Students/FormSections/AccountForm';
import AchievementsForm from '@/components/Students/FormSections/AchievementsForm';
import EducationForm from '@/components/Students/FormSections/EducationForm';
import FamilyInfoForm from '@/components/Students/FormSections/FamilyInfoForm';
import GuardianForm from '@/components/Students/FormSections/GuardianForm';
import HealthForm from '@/components/Students/FormSections/HealthForm';
import PersonalInfoForm from '@/components/Students/FormSections/PersonalInfoForm';
import StudentTabs from '@/components/Students/StudentTabs';
import { TabsContent } from '@/components/ui/tabs';

interface Props {
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
        href: '/dashboard',
    },
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Create Student',
        href: '#',
    },
];

export default function Create({
    jalurOptions,
    prodiOptions,
    jkOptions,
    agamaOptions,
    statusHuniOptions,
    pendidikanOptions,
    golDarahOptions,
}: Props) {
    const { data, setData, post, processing, errors, progress } = useForm({
        // User account fields
        name: '',
        username: '',
        password: '',
        email: '',
        photo: null as File | null,

        // Student fields
        no_test: '',
        jalur_penerimaan: '',
        angkatan: '',
        prodi: '',
        tmp_lahir: '',
        tgl_lahir: '',
        kab_lahir: '',
        prov_lahir: '',
        jk: '',
        alamat: '',
        nohp: '',
        agama: '',
        suku: '',
        kewarnegaraan: '',
        jml_kakak: '',
        jml_adik: '',
        status_huni_rumah: '',
        akademik: '',
        non_akademik: '',
        olahraga: '',
        kesenian: '',
        nama_ayah: '',
        agama_ayah: '',
        pendidikan_ayah: '',
        penghasilan_ayah: '',
        pekerjaan_ayah: '',
        nohp_ayah: '',
        nama_ibu: '',
        agama_ibu: '',
        pendidikan_ibu: '',
        penghasilan_ibu: '',
        pekerjaan_ibu: '',
        nohp_ibu: '',
        alamat_orangtua: '',
        daya_listrik: '',
        nama_wali: '',
        nipnrp: '',
        pangkat: '',
        instansi: '',
        pendidikan_wali: '',
        penghasilan_wali: '',
        alamat_wali: '',
        nohp_wali: '',
        nama_sekolah: '',
        kab_sekolah: '',
        prov_sekolah: '',
        thn_masuk: '',
        thn_lulus: '',
        jml_mapel: '',
        nilai: '',
        no_ijazah: '',
        tinggi: '',
        berat: '',
        tekanan_darah: '',
        gol_darah: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting form data:', data);
        post(route('students.store'), {
            forceFormData: true,
            onSuccess: () => {
                // Reset form or redirect
            },
        });
    };

    const handleDataChange = (key: string, value: any) => {
        setData(key, value);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Student" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Link href={route('students.index')}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Create New Student</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 rounded-md border border-red-200 bg-red-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
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
                    <StudentTabs defaultTab="account">
                        <TabsContent value="account">
                            <AccountForm data={data} setData={handleDataChange} errors={errors} />
                        </TabsContent>

                        <TabsContent value="personal">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <AcademicInfoForm data={data} setData={handleDataChange} errors={errors} options={{ jalurOptions, prodiOptions }} />
                                <PersonalInfoForm
                                    data={data}
                                    setData={handleDataChange}
                                    errors={errors}
                                    options={{ jkOptions, agamaOptions, statusHuniOptions }}
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="family">
                            <FamilyInfoForm data={data} setData={handleDataChange} errors={errors} options={{ agamaOptions, pendidikanOptions }} />
                        </TabsContent>

                        <TabsContent value="education">
                            <EducationForm data={data} setData={handleDataChange} errors={errors} />
                        </TabsContent>

                        <TabsContent value="achievements">
                            <AchievementsForm data={data} setData={handleDataChange} errors={errors} />
                        </TabsContent>

                        <TabsContent value="guardian">
                            <GuardianForm data={data} setData={handleDataChange} errors={errors} options={{ pendidikanOptions }} />
                        </TabsContent>

                        <TabsContent value="health">
                            <HealthForm data={data} setData={handleDataChange} errors={errors} options={{ golDarahOptions }} />
                        </TabsContent>
                    </StudentTabs>

                    <div className="mt-6 flex justify-end">
                        <Button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 md:w-auto"
                        >
                            {processing ? 'Saving...' : 'Save Student'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
