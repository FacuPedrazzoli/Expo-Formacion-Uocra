'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, QrCode, Mic, Calendar, FileText, ClipboardList, Upload } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Usuarios', icon: Users },
  { href: '/admin/checkin', label: 'Check-in', icon: QrCode },
  { href: '/admin/talks', label: 'Charlas', icon: Mic },
  { href: '/admin/events', label: 'Eventos', icon: Calendar },
  { href: '/admin/content', label: 'Contenido', icon: FileText },
  { href: '/admin/surveys', label: 'Encuestas', icon: ClipboardList },
  { href: '/admin/csv', label: 'Subir CSV', icon: Upload },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-card shrink-0">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <p className="text-xs text-muted-foreground">Expo UOCRA</p>
        </div>
        <nav className="p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}