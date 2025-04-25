import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 z-0">
            {/* Decorative circles */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white opacity-10 rounded-full filter blur-xl animate-blob"></div>
            <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-pink-300 opacity-10 rounded-full filter blur-xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-300 opacity-10 rounded-full filter blur-xl animate-blob animation-delay-4000"></div>

            {/* Pattern overlay */}
            <div className="absolute inset-0 bg-pattern opacity-5"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center pt-6 sm:pt-0 w-full max-w-md px-4">
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-full mb-2 shadow-xl border border-white/20 transform hover:scale-105 transition-transform duration-300">
                <Link href="/" className="block">
                    <div className="bg-white rounded-full p-2 shadow-inner">
                        <img
                            src="/assets/images/logo.png"
                            className="h-20 w-20 object-contain"
                            alt="FKUH SIM"
                        />
                    </div>
                </Link>
            </div>

            <h4 className="text-2xl text-center mt-3 font-bold text-white drop-shadow-md">
                Fakultas Kedokteran Universitas Hasanuddin
            </h4>

            <div className="mt-6 w-full overflow-hidden px-6 py-4 sm:max-w-md">
                {children}
            </div>

            <div className="mt-8 text-center text-white/70 text-sm">
                <p>
                    © {new Date().getFullYear()} SIM UNHAS. All
                    rights reserved.
                </p>
            </div>
        </div>
    </div>
    );
}
