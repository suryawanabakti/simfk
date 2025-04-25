import { Head, Link, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

declare global {
    interface Window {
        route: any;
    }
}

type LoginForm = {
    username: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        username: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(window.route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your username and password below to log in">

        <div className="w-full relative">
        {/* Glowing effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-pink-500 rounded-2xl blur opacity-70 animate-pulse"></div>

        <Card className="relative border border-white/20 shadow-xl backdrop-blur-sm bg-white/90">
            {/* Decorative icon */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-16 w-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
            </div>

            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-rose-800">
                    Masuk
                </CardTitle>
                <CardDescription className="text-rose-600">
                    Masukkan username dan password anda di form bawah ini.
                </CardDescription>
            </CardHeader>

            <CardContent>
            {status && <div className="mb-6 text-center text-sm font-medium text-rose-600 bg-rose-50 p-3 rounded-lg border border-rose-100">{status}</div>}
            
            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="username" className="text-rose-700">Username/NIM</Label>
                        <Input
                            id="username"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="username"
                            value={data.username}
                            onChange={(e) => setData('username', e.target.value)}
                            placeholder="Masukkan Username / Nim Kamu"
                            className="border-rose-200 focus:border-rose-400 focus:ring-rose-200 transition-all duration-200"
                        />
                        <InputError message={errors.username} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-rose-700">Password</Label>
                            {canResetPassword && (
                                <TextLink href={window.route('password.request')} className="ml-auto text-sm text-rose-600 hover:text-rose-800 transition-colors duration-200" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                            className="border-rose-200 focus:border-rose-400 focus:ring-rose-200 transition-all duration-200"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onClick={() => setData('remember', !data.remember)}
                            tabIndex={3}
                            className="text-rose-500 focus:ring-rose-400 border-rose-300 data-[state=checked]:bg-rose-500 data-[state=checked]:border-rose-500"
                        />
                        <Label htmlFor="remember" className="text-rose-700">Remember me</Label>
                    </div>

                    <Button 
                        type="submit" 
                        className="mt-4 w-full bg-rose-500 hover:bg-rose-600 text-white transition-all duration-300 shadow-sm hover:shadow-md" 
                        tabIndex={4} 
                        disabled={processing}
                    >
                        {processing ? (
                            <span className="flex items-center justify-center">
                                <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                Processing...
                            </span>
                        ) : (
                            <span className="relative group">
                                <span className="relative z-10">Log in</span>
                                <span className="absolute inset-0 bg-white/20 rounded-md scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                            </span>
                        )}
                    </Button>
                </div>
            </form>
            </CardContent>
        </Card>
    </div>
        </AuthLayout>
    );
}
