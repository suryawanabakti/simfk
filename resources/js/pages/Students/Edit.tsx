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

interface Student {
    id: number;
    user_id: number;
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
        photo: string | null;
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
        href: '/dashboard',
    },
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Edit Student',
        href: '#',
    },
];

export default function Edit({
    student,
    jalurOptions,
    prodiOptions,
    jkOptions,
    agamaOptions,
    statusHuniOptions,
    pendidikanOptions,
    golDarahOptions,
}: Props) {
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
        put(route('students.update', student.id), {
            // forceFormData: true,
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
            <Head title={`Edit Student: ${student.user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center gap-2">
                    <Link href={route('students.index')}>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold">Edit Student</h1>
                </div>

                <form onSubmit={handleSubmit}>
                    <StudentTabs defaultTab="personal">
                        <TabsContent value="account">
                            <AccountForm data={data} setData={handleDataChange} errors={errors} isEdit={true} />
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
                            {processing ? 'Saving...' : 'Update Student'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
