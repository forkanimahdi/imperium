import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [], actions }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], actions?: React.ReactNode }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader actions={actions} breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
