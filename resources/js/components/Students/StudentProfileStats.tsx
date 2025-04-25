import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, GraduationCapIcon, HeartIcon, UserIcon, Users2Icon } from 'lucide-react';

interface StudentProfileStatsProps {
    student: {
        angkatan?: number;
        prodi?: string;
        jk?: string;
        agama?: string;
        jml_kakak?: number;
        jml_adik?: number;
        tinggi?: number;
        berat?: number;
        gol_darah?: string;
    };
}

export default function StudentProfileStats({ student }: StudentProfileStatsProps) {
    return (
        <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-rose-600 to-purple-600 py-4">
                <CardTitle className="text-white">Informasi Mahasiswa</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Program Studi */}
                    <div className="flex items-center gap-3 rounded-lg bg-rose-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100">
                            <GraduationCapIcon className="h-5 w-5 text-rose-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-rose-600">Program Studi</p>
                            <p className="text-sm font-semibold">{student.prodi || 'Belum ditentukan'}</p>
                        </div>
                    </div>

                    {/* Angkatan */}
                    <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                            <CalendarIcon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-purple-600">Angkatan</p>
                            <p className="text-sm font-semibold">{student.angkatan || 'Belum ditentukan'}</p>
                        </div>
                    </div>

                    {/* Jenis Kelamin */}
                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <UserIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-blue-600">Jenis Kelamin</p>
                            <p className="text-sm font-semibold">{student.jk || 'Belum ditentukan'}</p>
                        </div>
                    </div>

                    {/* Saudara Kandung */}
                    <div className="flex items-center gap-3 rounded-lg bg-pink-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                            <Users2Icon className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-pink-600">Jumlah Saudara</p>
                            <p className="text-sm font-semibold">
                                {student.jml_kakak || 0} kakak, {student.jml_adik || 0} adik
                            </p>
                        </div>
                    </div>

                    {/* Kesehatan */}
                    <div className="col-span-2 flex items-center gap-3 rounded-lg bg-teal-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                            <HeartIcon className="h-5 w-5 text-teal-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-medium text-teal-600">Kesehatan</p>
                            <div className="flex justify-between">
                                <p className="text-sm font-semibold">
                                    {student.tinggi ? `${student.tinggi} cm` : '-'} / {student.berat ? `${student.berat} kg` : '-'}
                                </p>
                                <p className="text-sm font-semibold">Gol. Darah: {student.gol_darah || '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
