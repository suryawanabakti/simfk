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

    // Initialize photo preview if editing and photo exists
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
        <StudentFormSection title="Account Information" icon={<UserPlusIcon className="h-5 w-5" />} color="blue">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-blue-700">
                        Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="name"
                        value={isEdit ? data.user.name : data.name}
                        onChange={(e) => (isEdit ? setData('user', { ...data.user, name: e.target.value }) : setData('name', e.target.value))}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors['user.name'] && <p className="text-sm text-red-500">{errors['user.name']}</p>}
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email" className="text-blue-700">
                        Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                {!isEdit && (
                    <>
                        <div className="space-y-2">
                            <Label htmlFor="username" className="text-blue-700">
                                Username <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="username"
                                value={data.username}
                                onChange={(e) => setData('username', e.target.value)}
                                required
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.username && <p className="text-sm text-red-500">{errors.username}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-blue-700">
                                Password <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                                className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            />
                            {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                        </div>
                    </>
                )}

                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="photo" className="text-blue-700">
                        Profile Photo
                    </Label>
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        {photoPreview ? (
                            <img
                                src={photoPreview || '/placeholder.svg'}
                                alt="Preview"
                                className="h-24 w-24 rounded-full border-2 border-blue-200 object-cover"
                            />
                        ) : (
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
                                <UploadIcon className="h-8 w-8 text-blue-500" />
                            </div>
                        )}
                        <div className="flex-1">
                            <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="max-w-xs" />
                            <p className="mt-2 text-sm text-gray-500">Upload a profile photo. JPG, PNG or GIF, max 2MB.</p>
                        </div>
                    </div>
                    {errors.photo && <p className="text-sm text-red-500">{errors.photo}</p>}
                </div>
            </div>

            {!isEdit && (
                <div className="mt-4 rounded-md bg-blue-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-blue-700">These credentials will be used by the student to log in to the system.</p>
                        </div>
                    </div>
                </div>
            )}
        </StudentFormSection>
    );
}
