import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpenIcon, GraduationCapIcon, HeartIcon, HomeIcon, UserIcon, UserPlusIcon, Users2Icon } from 'lucide-react';
import type { ReactNode } from 'react';

interface StudentTabsProps {
    defaultTab?: string;
    children: ReactNode;
    compact?: boolean;
}

export default function StudentTabs({ defaultTab = 'personal', children, compact = false }: StudentTabsProps) {
    return (
        <Tabs defaultValue={defaultTab} className="w-full">
            <div className="overflow-x-auto pb-2">
                <TabsList className={`grid w-full min-w-max ${compact ? 'grid-cols-2 md:grid-cols-7' : 'grid-cols-7'} mb-4`}>
                    <TabsTrigger value="account" className="flex items-center gap-2">
                        <UserPlusIcon className="h-4 w-4" />
                        <span className={compact ? 'hidden sm:inline' : ''}>Account</span>
                    </TabsTrigger>
                    <TabsTrigger value="personal" className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        <span className={compact ? 'hidden sm:inline' : ''}>Personal</span>
                    </TabsTrigger>
                    <TabsTrigger value="family" className="flex items-center gap-2">
                        <Users2Icon className="h-4 w-4" />
                        <span className={compact ? 'hidden sm:inline' : ''}>Family</span>
                    </TabsTrigger>
                    <TabsTrigger value="education" className="flex items-center gap-2">
                        <GraduationCapIcon className="h-4 w-4" />
                        <span className={compact ? 'hidden sm:inline' : ''}>Education</span>
                    </TabsTrigger>
                    <TabsTrigger value="achievements" className="flex items-center gap-2">
                        <BookOpenIcon className="h-4 w-4" />
                        <span className={compact ? 'hidden sm:inline' : ''}>Achievements</span>
                    </TabsTrigger>
                    <TabsTrigger value="guardian" className="flex items-center gap-2">
                        <HomeIcon className="h-4 w-4" />
                        <span className={compact ? 'hidden sm:inline' : ''}>Guardian</span>
                    </TabsTrigger>
                    <TabsTrigger value="health" className="flex items-center gap-2">
                        <HeartIcon className="h-4 w-4" />
                        <span className={compact ? 'hidden sm:inline' : ''}>Health</span>
                    </TabsTrigger>
                </TabsList>
            </div>

            {children}
        </Tabs>
    );
}
