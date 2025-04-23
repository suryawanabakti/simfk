import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Printer, Settings, UserCircle, Users } from 'lucide-react';
import AppLogo from './app-logo';

// Admin navigation items
const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Print Documents',
        href: '/documents/print',
        icon: Printer,
    },
    {
        title: 'Students',
        href: '/students',
        icon: Users,
    },

    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

// Student navigation items
const studentNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/student/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'My Profile',
        href: '/student/edit-profile',
        icon: UserCircle,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    // Determine if user has admin role
    const isAdmin = auth.user.username === 'superadmin';
    // Choose navigation items based on user role
    const navItems = isAdmin ? adminNavItems : studentNavItems;

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-gray-200 bg-white">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={isAdmin ? '/dashboard' : '/student/dashboard'} prefetch className="flex items-center gap-2">
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter className="mt-auto border-t border-gray-100 py-4">
                <NavFooter items={footerNavItems} className="mb-4" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
