import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    AwardIcon,
    BookOpenIcon,
    CalendarIcon,
    GraduationCapIcon,
    HeartIcon,
    HomeIcon,
    MapPinIcon,
    UserIcon,
    UserPlusIcon,
    UsersIcon,
} from 'lucide-react';
import type React from 'react';

interface Student {
    id: number;
    user_id?: number;
    no_test?: string;
    jalur_penerimaan?: string;
    prodi?: string;
    angkatan?: string | number;
    email?: string;
    jk?: string;
    tmp_lahir?: string;
    tgl_lahir?: string;
    alamat?: string;
    nohp?: string;
    agama?: string;
    suku?: string;
    jml_kakak?: number;
    jml_adik?: number;
    status_huni_rumah?: string;
    nama_sekolah?: string;
    thn_lulus?: string;
    no_ijazah?: string;
    akademik?: string;
    non_akademik?: string;
    olahraga?: string;
    kesenian?: string;
    nama_ayah?: string;
    agama_ayah?: string;
    pekerjaan_ayah?: string;
    pendidikan_ayah?: string;
    penghasilan_ayah?: string;
    nohp_ayah?: string;
    nama_ibu?: string;
    agama_ibu?: string;
    pekerjaan_ibu?: string;
    pendidikan_ibu?: string;
    penghasilan_ibu?: string;
    nohp_ibu?: string;
    alamat_orangtua?: string;
    daya_listrik?: string;
    nama_wali?: string;
    perkejaan_wali?: string;
    penghasilan_wali?: string;
    pendidikan_wali?: string;
    alamat_wali?: string;
    nohp_wali?: string;
    kab_lahir?: string;
    prov_lahir?: string;
    kab_sekolah?: string;
    prov_sekolah?: string;
    thn_masuk?: string;
    jml_mapel?: string;
    nilai?: string;
    tinggi?: string;
    berat?: string;
    tekanan_darah?: string;
    gol_darah?: string;
    user: {
        id: number;
        name: string;
        username: string;
        photo?: string;
    };
    jalur_masuk?: string;
    profile_photo_url?: string;
}

interface StudentDetailsModalProps {
    student: Student;
    isOpen: boolean;
    onClose: () => void;
}

// Format data for display
const formatData = (value: any) => {
    if (value === null || value === undefined || value === '') {
        return '-';
    }
    return value;
};

// Get admission badge color
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

const StudentDetailsModal: React.FC<StudentDetailsModalProps> = ({ student, isOpen, onClose }) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-h-[90vh] max-w-5xl overflow-hidden p-0">
                <DialogHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                        <UserIcon className="h-5 w-5" />
                        Student Details
                    </DialogTitle>
                    <p className="text-indigo-100">Complete information about the selected student</p>
                </DialogHeader>

                {student && (
                    <div className="flex h-full flex-col">
                        <div className="border-b bg-gray-50 p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                    {student.profile_photo_url || student.user.photo ? (
                                        <img
                                            src={student.profile_photo_url || `/storage/${student.user.photo}`}
                                            alt={student.user.name}
                                            className="h-20 w-20 rounded-full border-4 border-white object-cover shadow-md"
                                        />
                                    ) : (
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-md">
                                            <UserIcon className="h-10 w-10" />
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900">{student.user.name}</h3>
                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                        <Badge variant="outline" className="border-gray-300 font-mono text-gray-600">
                                            {student.user.username}
                                        </Badge>
                                        {student.prodi && (
                                            <Badge className="flex items-center gap-1 bg-purple-100 text-purple-800">
                                                <GraduationCapIcon className="h-3 w-3" />
                                                {student.prodi}
                                            </Badge>
                                        )}
                                        {student.angkatan && (
                                            <Badge className="flex items-center gap-1 bg-indigo-100 text-indigo-800">
                                                <CalendarIcon className="h-3 w-3" />
                                                {student.angkatan}
                                            </Badge>
                                        )}
                                        {(student.jalur_penerimaan || student.jalur_masuk) && (
                                            <Badge className={getAdmissionBadgeColor(student.jalur_penerimaan || student.jalur_masuk)}>
                                                {student.jalur_penerimaan || student.jalur_masuk}
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Tabs defaultValue="personal" className="flex-1 overflow-hidden">
                            <div className="border-b bg-white px-6">
                                <TabsList className="h-14">
                                    <TabsTrigger value="personal" className="flex items-center gap-1">
                                        <UserIcon className="h-4 w-4" />
                                        <span>Personal</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="academic" className="flex items-center gap-1">
                                        <GraduationCapIcon className="h-4 w-4" />
                                        <span>Academic</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="family" className="flex items-center gap-1">
                                        <UsersIcon className="h-4 w-4" />
                                        <span>Family</span>
                                    </TabsTrigger>
                                    <TabsTrigger value="health" className="flex items-center gap-1">
                                        <HeartIcon className="h-4 w-4" />
                                        <span>Health</span>
                                    </TabsTrigger>
                                </TabsList>
                            </div>

                            <ScrollArea className="h-[calc(90vh-220px)]">
                                <div className="p-6">
                                    <TabsContent value="personal" className="m-0">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <UserIcon className="h-5 w-5 text-indigo-500" />
                                                        Basic Information
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Full Name</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.user.name)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Student ID</dt>
                                                            <dd className="font-mono text-sm text-gray-900">{formatData(student.user.username)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Test Number</dt>
                                                            <dd className="font-mono text-sm text-gray-900">{formatData(student.no_test)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Gender</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.jk)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Religion</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.agama)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Ethnicity</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.suku)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <MapPinIcon className="h-5 w-5 text-indigo-500" />
                                                        Contact Information
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Email</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.email)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.nohp)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.alamat)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Place of Birth</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.tmp_lahir)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Date of Birth</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.tgl_lahir)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>

                                            <Card className="md:col-span-2">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <HomeIcon className="h-5 w-5 text-indigo-500" />
                                                        Housing & Family
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Housing Status</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.status_huni_rumah)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Number of Siblings</dt>
                                                            <dd className="text-sm text-gray-900">
                                                                {student.jml_kakak || student.jml_adik
                                                                    ? `${student.jml_kakak || 0} older, ${student.jml_adik || 0} younger`
                                                                    : '-'}
                                                            </dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Home Electricity</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.daya_listrik)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="academic" className="m-0">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <GraduationCapIcon className="h-5 w-5 text-indigo-500" />
                                                        Academic Information
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Program</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.prodi)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Batch Year</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.angkatan)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Admission Path</dt>
                                                            <dd className="text-sm text-gray-900">
                                                                {formatData(student.jalur_penerimaan || student.jalur_masuk)}
                                                            </dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <BookOpenIcon className="h-5 w-5 text-indigo-500" />
                                                        Previous Education
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">School Name</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.nama_sekolah)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">School Location</dt>
                                                            <dd className="text-sm text-gray-900">
                                                                {student.kab_sekolah || student.prov_sekolah
                                                                    ? `${student.kab_sekolah || ''}, ${student.prov_sekolah || ''}`
                                                                    : '-'}
                                                            </dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Entry Year</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.thn_masuk)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Graduation Year</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.thn_lulus)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Certificate Number</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.no_ijazah)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>

                                            <Card className="md:col-span-2">
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <AwardIcon className="h-5 w-5 text-indigo-500" />
                                                        Achievements & Interests
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Academic Achievements</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.akademik)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Non-Academic Achievements</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.non_akademik)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Sports</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.olahraga)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Arts</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.kesenian)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="family" className="m-0">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <UserIcon className="h-5 w-5 text-indigo-500" />
                                                        Father's Information
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.nama_ayah)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Religion</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.agama_ayah)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.nohp_ayah)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.pekerjaan_ayah)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Education</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.pendidikan_ayah)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.penghasilan_ayah)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <UserIcon className="h-5 w-5 text-indigo-500" />
                                                        Mother's Information
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.nama_ibu)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Religion</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.agama_ibu)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.nohp_ibu)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.pekerjaan_ibu)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Education</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.pendidikan_ibu)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.penghasilan_ibu)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <UserPlusIcon className="h-5 w-5 text-indigo-500" />
                                                        Guardian's Information
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Name</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.nama_wali)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Phone</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.nohp_wali)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Occupation</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.perkejaan_wali)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Education</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.pendidikan_wali)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Monthly Income</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.penghasilan_wali)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.alamat_wali)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>

                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <HomeIcon className="h-5 w-5 text-indigo-500" />
                                                        Parents' Address
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Address</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.alamat_orangtua)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="health" className="m-0">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <Card>
                                                <CardHeader className="pb-2">
                                                    <CardTitle className="flex items-center gap-2 text-lg">
                                                        <HeartIcon className="h-5 w-5 text-indigo-500" />
                                                        Health Information
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <dl className="space-y-2">
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Height</dt>
                                                            <dd className="text-sm text-gray-900">{student.tinggi ? `${student.tinggi} cm` : '-'}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Weight</dt>
                                                            <dd className="text-sm text-gray-900">{student.berat ? `${student.berat} kg` : '-'}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Blood Pressure</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.tekanan_darah)}</dd>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between">
                                                            <dt className="text-sm font-medium text-gray-500">Blood Type</dt>
                                                            <dd className="text-sm text-gray-900">{formatData(student.gol_darah)}</dd>
                                                        </div>
                                                    </dl>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </TabsContent>
                                </div>
                            </ScrollArea>
                        </Tabs>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default StudentDetailsModal;
