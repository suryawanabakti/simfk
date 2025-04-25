'use client';

import type React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UploadIcon, UserPlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import StudentFormSection from '../StudentFormSection';

interface AccountFormProps {
    data: any;
    setData: (key: string, value: any) => void;
    errors: any;
    isEdit?: boolean;
}

export default function AccountForm({ data, setData, errors, isEdit = false }: AccountFormProps) {
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    useEffect(() => {
        if (isEdit) {
            if (data.photo) {
                setPhotoPreview(`/storage/${data.photo}`);
            } else if (data.user?.photo) {
                setPhotoPreview(`/storage/${data.user.photo}`);
            }
        }
    }, [isEdit, data.photo, data.user?.photo]);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('photo', file);

            const reader = new FileReader();
            reader.onload = (e) => {
                setPhotoPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <StudentFormSection title="Informasi Akun" icon={<UserPlusIcon className="h-5 w-5" />} color="rose">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Nama Lengkap */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-rose-700">
                        Nama Lengkap <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="name"
                        value={isEdit ? data.user.name : data.name}
                        onChange={(e) =>
                            isEdit ? setData('user', { ...data.user, name: e.target.value }) : setData('name', e.target.value)
                        }
                        required
                        className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                    />
                    {errors['user.name'] && <p className="text-sm text-red-500">{errors['user.name']}</p>}
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-rose-700">
                        Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                {/* Username dan Password */}
                {!isEdit && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-rose-700">
                                Nama Pengguna <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                required
                                className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                            />
                            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-rose-700">
                                Kata Sandi <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                className="border-gray-300 focus:border-rose-500 focus:ring-rose-500"
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>
                    </>
                )}

                {/* Foto Profil */}
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="photo" className="text-rose-700">
                        Foto Profil
                    </Label>
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        {photoPreview ? (
                            <img
                                src={photoPreview || '/placeholder.svg'}
                                alt="Pratinjau"
                                className="h-24 w-24 rounded-full border-2 border-rose-200 object-cover"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-100">
                                <UploadIcon className="h-8 w-8 text-rose-500" />
                            </div>
                        )}
                        <div className="flex-1">
                            <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="max-w-xs" />
                            <p className="mt-2 text-sm text-gray-500">Unggah foto profil. Format JPG, PNG, atau GIF. Maks 2MB.</p>
                        </div>
                    </div>
                    {errors.photo && <p className="text-sm text-red-500">{errors.photo}</p>}
                </div>
            </div>

            {/* Catatan untuk login */}
            {!isEdit && (
                <div className="mt-4 rounded-md bg-rose-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-rose-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-rose-700">
                                Data login ini akan digunakan oleh mahasiswa untuk masuk ke sistem.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </StudentFormSection>
    );
}
