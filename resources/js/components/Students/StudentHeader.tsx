import { Card, CardContent } from '@/components/ui/card';
import { CalendarIcon, GraduationCapIcon, MailIcon, PhoneIcon, UserIcon } from 'lucide-react';

interface StudentHeaderProps {
    student: {
        photo?: string | null;
        user: {
            name: string;
            photo?: string | null;
        };
        no_test?: string;
        prodi?: string;
        jalur_penerimaan?: string;
        angkatan?: number;
        email?: string;
        nohp?: string;
    };
}

export default function StudentHeader({ student }: StudentHeaderProps) {
    return (
        <Card className="border-none bg-gradient-to-r from-rose-600 to-purple-600 text-white shadow-md">
            <CardContent className="p-6">
                <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                    {student.photo ? (
                        <img
                            src={`/storage/${student.photo}`}
                            alt={student.user.name}
                            className="h-24 w-24 rounded-full border-4 border-white/30 object-cover"
                        />
                    ) : student.user.photo ? (
                        <img
                            src={`/storage/${student.user.photo}`}
                            alt={student.user.name}
                            className="h-24 w-24 rounded-full border-4 border-white/30 object-cover"
                        />
                    ) : (
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 text-white">
                            <UserIcon className="h-12 w-12" />
                        </div>
                    )}
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold">{student.user.name}</h2>
                        <div className="mt-2 flex flex-wrap gap-3">
                            {student.no_test && (
                                <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm">
                                    <span>No. Tes: {student.no_test}</span>
                                </div>
                            )}
                            {student.prodi && (
                                <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm">
                                    <GraduationCapIcon className="h-3.5 w-3.5" />
                                    <span>{student.prodi}</span>
                                </div>
                            )}
                            {student.jalur_penerimaan && (
                                <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm">
                                    <span>Jalur: {student.jalur_penerimaan}</span>
                                </div>
                            )}
                            {student.angkatan && (
                                <div className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-sm">
                                    <CalendarIcon className="h-3.5 w-3.5" />
                                    <span>Angkatan {student.angkatan}</span>
                                </div>
                            )}
                        </div>
                        <div className="mt-4 flex flex-wrap gap-4">
                            {student.email && (
                                <div className="flex items-center gap-2">
                                    <MailIcon className="h-4 w-4" />
                                    <span>{student.email}</span>
                                </div>
                            )}
                            {student.nohp && (
                                <div className="flex items-center gap-2">
                                    <PhoneIcon className="h-4 w-4" />
                                    <span>{student.nohp}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
