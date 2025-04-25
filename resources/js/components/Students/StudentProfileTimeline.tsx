import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenIcon, CalendarIcon, GraduationCapIcon, UserIcon } from 'lucide-react';

interface StudentProfileTimelineProps {
    student: {
        thn_masuk?: number;
        thn_lulus?: number;
        angkatan?: number;
        jalur_penerimaan?: string;
        nama_sekolah?: string;
    };
}

export default function StudentProfileTimeline({ student }: StudentProfileTimelineProps) {
    return (
        <Card className="overflow-hidden border-none shadow-md">
            <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 py-4">
                <CardTitle className="text-white">Riwayat Pendidikan</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="relative border-l-2 border-rose-200 pt-2 pl-6">
                    {/* Pendidikan Sebelumnya */}
                    {(student.thn_masuk || student.thn_lulus || student.nama_sekolah) && (
                        <div className="relative mb-8">
                            <div className="absolute -left-[29px] flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                                <BookOpenIcon className="h-5 w-5 text-rose-600" />
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                                <div className="flex items-center text-sm text-gray-500">
                                    <CalendarIcon className="mr-1 h-3 w-3" />
                                    <span>
                                        {student.thn_masuk ? `${student.thn_masuk}` : '?'} - {student.thn_lulus ? `${student.thn_lulus}` : '?'}
                                    </span>
                                </div>
                                <h3 className="mt-1 text-base font-medium text-gray-900">Pendidikan Sebelumnya</h3>
                                <p className="mt-1 text-sm text-gray-600">{student.nama_sekolah || 'Nama sekolah tidak tersedia'}</p>
                            </div>
                        </div>
                    )}

                    {/* Masuk Perguruan Tinggi */}
                    {(student.angkatan || student.jalur_penerimaan) && (
                        <div className="relative mb-8">
                            <div className="absolute -left-[29px] flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <UserIcon className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                                <div className="flex items-center text-sm text-gray-500">
                                    <CalendarIcon className="mr-1 h-3 w-3" />
                                    <span>{student.angkatan || 'Tahun tidak diketahui'}</span>
                                </div>
                                <h3 className="mt-1 text-base font-medium text-gray-900">Masuk Perguruan Tinggi</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Masuk melalui jalur {student.jalur_penerimaan || 'tidak diketahui'}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Status Saat Ini */}
                    <div className="relative">
                        <div className="absolute -left-[29px] flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                            <GraduationCapIcon className="h-5 w-5 text-pink-600" />
                        </div>
                        <div className="rounded-lg bg-gradient-to-r from-rose-50 to-purple-50 p-4 shadow-sm">
                            <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon className="mr-1 h-3 w-3" />
                                <span>Sekarang</span>
                            </div>
                            <h3 className="mt-1 text-base font-medium text-gray-900">Pendidikan Saat Ini</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                {student.angkatan ? `Angkatan ${student.angkatan}` : ''}{' '}
                                {student.jalur_penerimaan ? `- ${student.jalur_penerimaan}` : ''}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
