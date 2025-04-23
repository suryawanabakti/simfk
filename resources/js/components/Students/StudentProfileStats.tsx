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
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4">
                <CardTitle className="text-white">Student Information</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 rounded-lg bg-indigo-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                            <GraduationCapIcon className="h-5 w-5 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-indigo-600">Program</p>
                            <p className="text-sm font-semibold">{student.prodi || 'Not specified'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-purple-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                            <CalendarIcon className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-purple-600">Batch</p>
                            <p className="text-sm font-semibold">{student.angkatan || 'Not specified'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                            <UserIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-blue-600">Gender</p>
                            <p className="text-sm font-semibold">{student.jk || 'Not specified'}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-lg bg-pink-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                            <Users2Icon className="h-5 w-5 text-pink-600" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-pink-600">Siblings</p>
                            <p className="text-sm font-semibold">
                                {student.jml_kakak || 0} older, {student.jml_adik || 0} younger
                            </p>
                        </div>
                    </div>

                    <div className="col-span-2 flex items-center gap-3 rounded-lg bg-teal-50 p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                            <HeartIcon className="h-5 w-5 text-teal-600" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-medium text-teal-600">Health</p>
                            <div className="flex justify-between">
                                <p className="text-sm font-semibold">
                                    {student.tinggi ? `${student.tinggi} cm` : '-'} / {student.berat ? `${student.berat} kg` : '-'}
                                </p>
                                <p className="text-sm font-semibold">Blood: {student.gol_darah || '-'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
