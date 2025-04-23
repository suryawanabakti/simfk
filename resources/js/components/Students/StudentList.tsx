import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { CalendarIcon, EyeIcon, GraduationCapIcon, PencilIcon, TrashIcon, UserIcon } from 'lucide-react';

interface Student {
    id: number;
    no_test: string;
    jalur_penerimaan: string;
    prodi: string;
    email: string;
    angkatan: number;
    photo: string | null;
    user: {
        id: number;
        name: string;
        username: string;
        photo: string | null;
    };
}

interface StudentListProps {
    students: Student[];
    route: (name: string, params?: any) => string;
}

export default function StudentList({ students, route }: StudentListProps) {
    const getAdmissionBadgeColor = (jalur: string) => {
        switch (jalur) {
            case 'SNMPTN':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'SBMPTN':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'Mandiri':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'INTERNASIONAL':
                return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    // Mobile card view for students
    const renderMobileCards = () => {
        return (
            <div className="grid grid-cols-1 gap-4 sm:hidden">
                {students.map((student) => (
                    <div key={student.id} className="overflow-hidden rounded-lg border bg-white p-4 shadow-sm">
                        <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                                {student.photo ? (
                                    <img
                                        src={`/storage/${student.photo}`}
                                        alt={student.user.name}
                                        className="h-14 w-14 rounded-full border-2 border-indigo-100 object-cover"
                                    />
                                ) : student.user.photo ? (
                                    <img
                                        src={`/storage/${student.user.photo}`}
                                        alt={student.user.name}
                                        className="h-14 w-14 rounded-full border-2 border-indigo-100 object-cover"
                                    />
                                ) : (
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                                        <UserIcon className="h-7 w-7" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900">{student.user.name}</h3>
                                <p className="font-mono text-sm text-gray-500">{student.user.username}</p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {student.angkatan && (
                                        <Badge className="flex items-center gap-1 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
                                            <CalendarIcon className="h-3 w-3" />
                                            <span>{student.angkatan}</span>
                                        </Badge>
                                    )}
                                    {student.prodi && (
                                        <Badge className="flex items-center gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200">
                                            <GraduationCapIcon className="h-3 w-3" />
                                            <span>{student.prodi}</span>
                                        </Badge>
                                    )}
                                    {student.jalur_penerimaan && (
                                        <Badge className={getAdmissionBadgeColor(student.jalur_penerimaan)}>{student.jalur_penerimaan}</Badge>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Link href={route('students.show', student.id)}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
                                >
                                    <EyeIcon className="h-4 w-4" />
                                    View
                                </Button>
                            </Link>
                            <Link href={route('students.edit', student.id)}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex items-center gap-1 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                    Edit
                                </Button>
                            </Link>
                            <Link
                                href={route('students.destroy', student.id)}
                                method="delete"
                                as="button"
                                type="button"
                                onBefore={() => confirm('Are you sure you want to delete this student?')}
                            >
                                <Button variant="destructive" size="sm" className="flex items-center gap-1">
                                    <TrashIcon className="h-4 w-4" />
                                    Delete
                                </Button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    // Desktop table view
    const renderDesktopTable = () => {
        return (
            <div className="hidden overflow-x-auto sm:block">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-50 text-left text-xs font-medium tracking-wider text-gray-500 uppercase dark:bg-gray-700 dark:text-gray-400">
                            <th className="px-6 py-3">Student</th>
                            <th className="px-6 py-3">Username</th>
                            <th className="px-6 py-3">Batch</th>
                            <th className="px-6 py-3">Program</th>
                            <th className="hidden px-6 py-3 md:table-cell">Admission</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
                        {students.map((student) => (
                            <tr key={student.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-700">
                                <td className="flex items-center gap-3 px-6 py-4 whitespace-nowrap">
                                    {student.photo ? (
                                        <img
                                            src={`/storage/${student.photo}`}
                                            alt={student.user.name}
                                            className="h-10 w-10 rounded-full border-2 border-indigo-100 object-cover"
                                        />
                                    ) : student.user.photo ? (
                                        <img
                                            src={`/storage/${student.user.photo}`}
                                            alt={student.user.name}
                                            className="h-10 w-10 rounded-full border-2 border-indigo-100 object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600">
                                            <UserIcon className="h-5 w-5" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-medium text-gray-900">{student.user.name}</p>
                                        <p className="text-xs text-gray-500">ID: {student.id}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-mono text-sm whitespace-nowrap text-gray-600">
                                    {student.user.username || <span className="text-gray-400">-</span>}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {student.angkatan ? (
                                        <Badge className="flex items-center gap-1 bg-indigo-100 text-indigo-800">
                                            <CalendarIcon className="h-3 w-3" />
                                            <span>{student.angkatan}</span>
                                        </Badge>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {student.prodi ? (
                                        <Badge className="flex items-center gap-1 bg-purple-100 text-purple-800">
                                            <GraduationCapIcon className="h-3 w-3" />
                                            <span>{student.prodi}</span>
                                        </Badge>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="hidden px-6 py-4 whitespace-nowrap md:table-cell">
                                    {student.jalur_penerimaan ? (
                                        <Badge className={getAdmissionBadgeColor(student.jalur_penerimaan)}>{student.jalur_penerimaan}</Badge>
                                    ) : (
                                        <span className="text-gray-400">-</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-wrap gap-2">
                                        <Link href={route('students.show', student.id)}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-1 border-indigo-200 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-800"
                                            >
                                                <EyeIcon className="h-4 w-4" />
                                                <span className="hidden sm:inline">View</span>
                                            </Button>
                                        </Link>
                                        <Link href={route('students.edit', student.id)}>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="flex items-center gap-1 border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800"
                                            >
                                                <PencilIcon className="h-4 w-4" />
                                                <span className="hidden sm:inline">Edit</span>
                                            </Button>
                                        </Link>
                                        <Link
                                            href={route('students.destroy', student.id)}
                                            method="delete"
                                            as="button"
                                            type="button"
                                            onBefore={() => confirm('Are you sure you want to delete this student?')}
                                        >
                                            <Button variant="destructive" size="sm" className="flex items-center gap-1">
                                                <TrashIcon className="h-4 w-4" />
                                                <span className="hidden sm:inline">Delete</span>
                                            </Button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <>
            {renderMobileCards()}
            {renderDesktopTable()}
        </>
    );
}
