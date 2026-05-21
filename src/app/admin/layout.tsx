'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, QrCode, Mic, Calendar, FileText, ClipboardList, Upload, CreditCard } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/users', label: 'Usuarios', icon: Users },
  { href: '/admin/checkin', label: 'Check-in', icon: QrCode },
  { href: '/admin/credentials', label: 'Credenciales', icon: CreditCard },
  { href: '/admin/talks', label: 'Charlas', icon: Mic },
  { href: '/admin/events', label: 'Eventos', icon: Calendar },
  { href: '/admin/content', label: 'Contenido', icon: FileText },
  { href: '/admin/surveys', label: 'Encuestas', icon: ClipboardList },
  { href: '/admin/csv', label: 'Subir CSV', icon: Upload },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f7]">
      <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e8e6e1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/images/logo-expo-formacion-nuevo.png" alt="Expo Formación UOCRA" width={180} height={90} priority className="h-12 w-auto" />
              <div className="hidden sm:block h-8 w-px bg-[#e8e6e1]" />
              <span className="hidden sm:block text-sm font-medium text-slate-600">Panel de Administración</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/" className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#124565] to-[#25848d] text-white text-sm font-semibold shadow-lg shadow-primary/20 hover:shadow-xl transition-all duration-200">
                ← Volver al sitio
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        <aside className="w-64 shrink-0 bg-white border-r border-[#e8e6e1] hidden lg:flex lg:flex-col">
          <nav className="p-4 flex-1">
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">Navegación</p>
            </div>
            <div className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || 
                  (item.href !== '/admin' && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-gradient-to-r from-[#124565] to-[#25848d] text-white shadow-lg shadow-primary/20'
                        : 'text-slate-600 hover:bg-[#f3f1ed] hover:text-[#124565]'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
          <div className="p-4 border-t border-[#e8e6e1]">
            <div className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#124565] to-[#25848d] text-white">
              <p className="text-xs font-medium opacity-80">Expo Formación</p>
              <p className="text-sm font-bold">UOCRA 2026</p>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <footer className="bg-[#0d1b2a] text-white py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-expo-formacion-nuevo.png" alt="Expo Formación UOCRA" width={120} height={60} className="opacity-70" />
          </div>
          <p className="text-sm text-white/60">
            © 2026 Expo Formación UOCRA. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}