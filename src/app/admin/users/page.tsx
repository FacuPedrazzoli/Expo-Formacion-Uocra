'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Download, Filter, ChevronLeft, ChevronRight, Eye, UserCheck, UserX, FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getActiveEventId } from '@/app/actions/checkin';
import { getUsers, getUsersCount, exportUsersToCSV } from '@/app/actions/data';
import type { User } from '@/types/user';

type FilterStatus = 'all' | 'checked_in' | 'not_checked_in' | 'has_survey';

export default function UsersPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [eventId, setEventId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const limit = 20;

  useEffect(() => {
    getActiveEventId().then(setEventId);
  }, []);

  useEffect(() => {
    if (eventId) {
      loadUsers();
    }
  }, [eventId, page, filterStatus]);

  const loadUsers = useCallback(async () => {
    if (!eventId) return;
    
    setLoading(true);
    try {
      const usersData = await getUsers(eventId, page, limit);
      const totalFromDb = await getUsersCount(eventId);
      
      let filtered = usersData;
      if (filterStatus === 'checked_in') {
        filtered = usersData.filter(u => u.checkedIn);
      } else if (filterStatus === 'not_checked_in') {
        filtered = usersData.filter(u => !u.checkedIn);
      }
      
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(u => 
          u.dni.includes(query) ||
          u.name.toLowerCase().includes(query) ||
          u.lastname.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
        );
      }
      
      setUsers(filtered);
      setTotalCount(totalFromDb);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  }, [eventId, page, filterStatus, searchQuery]);

  const handleSearch = useCallback(() => {
    setPage(1);
    loadUsers();
  }, [loadUsers]);

  const handleExportCSV = async () => {
    if (!eventId) return;
    
    setExporting(true);
    try {
      const csv = await exportUsersToCSV(eventId);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `usuarios_expo_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Error al exportar');
    } finally {
      setExporting(false);
    }
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Usuarios</h1>
          <p className="text-muted-foreground">{totalCount} inscriptos en total</p>
        </div>
        <Button 
          onClick={handleExportCSV} 
          disabled={exporting || users.length === 0}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {exporting ? 'Exportando...' : 'Exportar CSV'}
        </Button>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por DNI, nombre, apellido o email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value as FilterStatus);
                  setPage(1);
                }}
                className="h-10 px-3 rounded-md border bg-background"
              >
                <option value="all">Todos</option>
                <option value="checked_in">Check-in: Sí</option>
                <option value="not_checked_in">Check-in: No</option>
              </select>
              <Button variant="outline" onClick={handleSearch}>
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium">DNI</th>
                  <th className="text-left py-3 px-4 font-medium">Nombre</th>
                  <th className="text-left py-3 px-4 font-medium">Email</th>
                  <th className="text-left py-3 px-4 font-medium">Tipo</th>
                  <th className="text-left py-3 px-4 font-medium">Check-in</th>
                  <th className="text-left py-3 px-4 font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted-foreground">
                      Cargando...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-muted-foreground">
                      No se encontraron usuarios
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/30">
                      <td className="py-3 px-4 font-mono">{user.dni}</td>
                      <td className="py-3 px-4">
                        {user.name} {user.lastname}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {user.email}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">
                          {user.userType === 'web' ? 'Web' : 'Manual'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        {user.checkedIn ? (
                          <span className="flex items-center gap-1 text-green-600">
                            <UserCheck className="h-4 w-4" />
                            Sí
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <UserX className="h-4 w-4" />
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => router.push(`/admin/users/${user.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between py-4 px-6 border-t">
              <p className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
