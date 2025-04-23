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
                <CardTitle className="text-white">Education Timeline</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <div className="relative border-l-2 border-indigo-200 pt-2 pl-6">
                    {/* Previous Education */}
                    {(student.thn_masuk || student.thn_lulus || student.nama_sekolah) && (
                        <div className="relative mb-8">
                            <div className="absolute -left-[29px] flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                                <BookOpenIcon className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                                <div className="flex items-center text-sm text-gray-500">
                                    <CalendarIcon className="mr-1 h-3 w-3" />
                                    <span>
                                        {student.thn_masuk ? `${student.thn_masuk}` : '?'} - {student.thn_lulus ? `${student.thn_lulus}` : '?'}
                                    </span>
                                </div>
                                <h3 className="mt-1 text-base font-medium text-gray-900">Previous Education</h3>
                                <p className="mt-1 text-sm text-gray-600">{student.nama_sekolah || 'School not specified'}</p>
                            </div>
                        </div>
                    )}

                    {/* University Admission */}
                    {(student.angkatan || student.jalur_penerimaan) && (
                        <div className="relative mb-8">
                            <div className="absolute -left-[29px] flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                <UserIcon className="h-5 w-5 text-purple-600" />
                            </div>
                            <div className="rounded-lg bg-gray-50 p-4 shadow-sm">
                                <div className="flex items-center text-sm text-gray-500">
                                    <CalendarIcon className="mr-1 h-3 w-3" />
                                    <span>{student.angkatan || 'Year not specified'}</span>
                                </div>
                                <h3 className="mt-1 text-base font-medium text-gray-900">University Admission</h3>
                                <p className="mt-1 text-sm text-gray-600">
                                    Admitted through {student.jalur_penerimaan || 'unspecified'} admission path
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Current Education */}
                    <div className="relative">
                        <div className="absolute -left-[29px] flex h-12 w-12 items-center justify-center rounded-full bg-pink-100">
                            <GraduationCapIcon className="h-5 w-5 text-pink-600" />
                        </div>
                        <div className="rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 p-4 shadow-sm">
                            <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon className="mr-1 h-3 w-3" />
                                <span>Present</span>
                            </div>
                            <h3 className="mt-1 text-base font-medium text-gray-900">Current Studies</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                {student.angkatan ? `Batch ${student.angkatan}` : ''}{' '}
                                {student.jalur_penerimaan ? `- ${student.jalur_penerimaan}` : ''}
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
