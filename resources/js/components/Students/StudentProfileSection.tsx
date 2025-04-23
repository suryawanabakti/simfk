import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { ReactNode } from 'react';

interface Item {
    label: string;
    value: string;
    fullWidth?: boolean;
}

interface StudentProfileSectionProps {
    title: string;
    icon: ReactNode;
    items?: Item[];
    textContent?: string;
}

export default function StudentProfileSection({ title, icon, items, textContent }: StudentProfileSectionProps) {
    return (
        <Card className="overflow-hidden border-none shadow-sm">
            <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 py-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium text-gray-700">
                    {icon}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                {items && (
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                        {items.map((item, index) => (
                            <div key={index} className={item.fullWidth ? 'col-span-full' : ''}>
                                <p className="text-xs font-medium text-gray-500 uppercase">{item.label}</p>
                                <p className="mt-1 text-sm text-gray-800">{item.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {textContent && (
                    <div className="prose prose-sm max-w-none">
                        <div className="text-sm whitespace-pre-line text-gray-700">{textContent}</div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
