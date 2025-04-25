import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { NavItem, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Printer, Settings, UserCircle, Users, FileText, BookOpen, ClipboardList, Shield, Database, FileArchive, Bell, HelpCircle } from 'lucide-react';
import AppLogo from './app-logo';

// Super Admin navigation items
const superAdminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Documents',
        href: '/admin/documents',
        icon: FileText,
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
    // {
    //     title: 'Administrators',
    //     href: '/administrators',
    //     icon: Shield,
    // },
    // {
    //     title: 'System Logs',
    //     href: '/system-logs',
    //     icon: Database,
    // },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

// Admin navigation items
const adminNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Documents',
        href: '/admin/documents',
        icon: FileText,
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
        title: 'Documents',
        href: '/student/documents',
        icon: FileText,
    },
  
    {
        title: 'Edit Profile',
        href: '/student/edit-profile',
        icon: UserCircle,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Help & Support',
        href: '/help',
        icon: HelpCircle,
    },
    {
        title: 'Notifications',
        href: '/notifications',
        icon: Bell,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    // Determine user role
    const userRoles = auth.user?.role || [];
    const isSuper = "super"
    const isAdmin = "admin"
    const isStudent = "student"
    // Choose navigation items based on user role (priority: super > admin > student)
    let navItems = studentNavItems; // default
    let dashboardPath = '/student/dashboard';
    
    if (isAdmin) {
        navItems = adminNavItems;
        dashboardPath = '/dashboard';
    }
    
    if (isSuper) {
        navItems = superAdminNavItems;
        dashboardPath = '/dashboard';
    }

    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-gray-200 bg-white">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardPath} prefetch className="flex items-center gap-2">
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
                {/* <NavFooter items={footerNavItems} className="mb-4" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
