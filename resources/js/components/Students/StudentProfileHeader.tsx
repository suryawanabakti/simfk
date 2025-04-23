import { Badge } from '@/components/ui/badge';
import { CalendarIcon, GraduationCapIcon, MailIcon, PhoneIcon, UserIcon } from 'lucide-react';

interface StudentProfileHeaderProps {
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
        jk?: string;
    };
}

export default function StudentProfileHeader({ student }: StudentProfileHeaderProps) {
    const getAdmissionBadgeColor = (jalur?: string) => {
        if (!jalur) return 'bg-gray-100 text-gray-800';

        switch (jalur) {
            case 'SNMPTN':
                return 'bg-blue-100 text-blue-800';
            case 'SBMPTN':
                return 'bg-green-100 text-green-800';
            case 'Mandiri':
                return 'bg-purple-100 text-purple-800';
            case 'INTERNASIONAL':
                return 'bg-amber-100 text-amber-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-0.5 shadow-xl">
            <div className="relative rounded-[0.65rem] bg-white">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-50"></div>
                <div className="relative p-6">
                    <div className="flex flex-col items-center gap-6 md:flex-row">
                        <div className="relative">
                            {student.photo ? (
                                <img
                                    src={`/storage/${student.photo}`}
                                    alt={student.user.name}
                                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                                />
                            ) : student.user.photo ? (
                                <img
                                    src={`/storage/${student.user.photo}`}
                                    alt={student.user.name}
                                    className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-md"
                                />
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gradient-to-r from-indigo-100 to-purple-100 shadow-md">
                                    <UserIcon className="h-12 w-12 text-indigo-600" />
                                </div>
                            )}
                            <div className="absolute -right-1 -bottom-1 rounded-full bg-white p-1 shadow-md">
                                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white">
                                    {student.jk === 'Laki-laki' ? 'M' : student.jk === 'Perempuan' ? 'F' : '?'}
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl font-bold text-gray-900">{student.user.name}</h1>

                            <div className="mt-2 flex flex-wrap justify-center gap-2 md:justify-start">
                                {student.no_test && (
                                    <Badge variant="outline" className="flex items-center gap-1 border-indigo-200 px-3 py-1 text-indigo-700">
                                        <span className="font-mono">{student.no_test}</span>
                                    </Badge>
                                )}

                                {student.prodi && (
                                    <Badge variant="outline" className="flex items-center gap-1 border-purple-200 px-3 py-1 text-purple-700">
                                        <GraduationCapIcon className="h-3.5 w-3.5" />
                                        <span>{student.prodi}</span>
                                    </Badge>
                                )}

                                {student.jalur_penerimaan && (
                                    <Badge className={`px-3 py-1 ${getAdmissionBadgeColor(student.jalur_penerimaan)}`}>
                                        {student.jalur_penerimaan}
                                    </Badge>
                                )}

                                {student.angkatan && (
                                    <Badge variant="outline" className="flex items-center gap-1 border-pink-200 px-3 py-1 text-pink-700">
                                        <CalendarIcon className="h-3.5 w-3.5" />
                                        <span>Batch {student.angkatan}</span>
                                    </Badge>
                                )}
                            </div>

                            <div className="mt-4 flex flex-wrap justify-center gap-4 text-gray-600 md:justify-start">
                                {student.email && (
                                    <div className="flex items-center gap-2">
                                        <MailIcon className="h-4 w-4 text-indigo-500" />
                                        <span>{student.email}</span>
                                    </div>
                                )}

                                {student.nohp && (
                                    <div className="flex items-center gap-2">
                                        <PhoneIcon className="h-4 w-4 text-indigo-500" />
                                        <span>{student.nohp}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                                <span className="text-xs font-medium uppercase">Student</span>
                                <span className="text-2xl font-bold">ID</span>
                                <span className="text-sm font-medium">{student.user.id}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
