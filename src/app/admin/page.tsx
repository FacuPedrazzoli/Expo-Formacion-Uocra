'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, UserCheck, ClipboardCheck, Calendar, QrCode, Mic, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCheckinStats, getActiveEventId } from '@/app/actions/data';
import { surveyRepo } from '@/lib/repositories/surveyRepo';
import { eventRepo } from '@/lib/repositories/eventRepo';

interface DashboardStats {
  total: number;
  checkedIn: number;
  todayCheckins: number;
  percentage: number;
  surveyResponses: number;
}

interface RecentActivity {
  id: string;
  type: 'checkin' | 'survey';
  userName: string;
  dni: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeEvent, setActiveEvent] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const eventId = await getActiveEventId();
      if (!eventId) {
        setLoading(false);
        return;
      }
      setActiveEvent(eventId);
      
      const [checkinStats, surveyResponses, event] = await Promise.all([
        getCheckinStats(eventId),
        surveyRepo.getAnswersByEvent(eventId),
        eventRepo.getActiveEvent(),
      ]);
      
      setStats({
        ...checkinStats,
        surveyResponses: surveyResponses.length,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-32 bg-muted rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Panel de control paraExpo Formación UOCRA
        </p>
      </div>

      {stats && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Inscriptos</p>
                    <p className="text-3xl font-bold">{stats.total}</p>
                  </div>
                  <Users className="h-10 w-10 text-muted-foreground" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Asistencia</p>
                    <p className="text-3xl font-bold">{stats.checkedIn}</p>
                    <p className="text-xs text-muted-foreground">
                      {stats.percentage}% del total
                    </p>
                  </div>
                  <UserCheck className="h-10 w-10 text-green-600" />
                </div>
                <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-green-600 transition-all duration-500"
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Check-ins Hoy</p>
                    <p className="text-3xl font-bold">{stats.todayCheckins}</p>
                  </div>
                  <CheckCircle className="h-10 w-10 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Encuestas</p>
                    <p className="text-3xl font-bold">{stats.surveyResponses}</p>
                  </div>
                  <ClipboardCheck className="h-10 w-10 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Check-in Rápido
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Escaneá el QR o ingresá el DNI para validar asistentes
                </p>
                <Link href="/admin/checkin">
                  <Button className="w-full">
                    Ir a Check-in
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Gestión de Usuarios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Buscar, filtrar y exportar usuarios registrados
                </p>
                <Link href="/admin/users">
                  <Button variant="outline" className="w-full">
                    Ver Usuarios
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Credenciales QR
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Descargar credenciales individuales o masivas
                </p>
                <Link href="/admin/credentials">
                  <Button variant="outline" className="w-full">
                    Ver Credenciales
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {!stats && !loading && (
        <Card className="p-12 text-center">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-semibold mb-2">No hay evento activo</h2>
          <p className="text-muted-foreground">
            Activá un evento desde la gestión de eventos para ver las estadísticas
          </p>
        </Card>
      )}
    </div>
  );
}
