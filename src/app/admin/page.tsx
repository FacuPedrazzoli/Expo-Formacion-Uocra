'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, UserCheck, ClipboardCheck, Calendar, QrCode, ArrowRight, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getCheckinStats } from '@/app/actions/data';
import { surveyRepo } from '@/lib/repositories/surveyRepo';
import { eventRepo } from '@/lib/repositories/eventRepo';

interface DashboardStats {
  total: number;
  checkedIn: number;
  todayCheckins: number;
  percentage: number;
  surveyResponses: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [_activeEvent, _setActiveEvent] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
    try {
      const event = await eventRepo.getActiveEvent();
      if (!event) {
        setLoading(false);
        return;
      }
      const eventId = event.id;
      _setActiveEvent(eventId);
      
      const [checkinStats, surveyResponses] = await Promise.all([
        getCheckinStats(eventId),
        surveyRepo.getAnswersByEvent(eventId),
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
        <div className="mb-8">
          <div className="h-9 w-48 bg-muted rounded-lg mb-2" />
          <div className="h-5 w-72 bg-muted rounded" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-36 bg-white rounded-2xl shadow-sm" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#124565] mb-2">Dashboard</h1>
        <p className="text-muted-foreground">
          Panel de control para Expo Formación UOCRA
        </p>
      </div>

      {stats && (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-lg shadow-[#124565]/10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#124565] to-[#25848d]" />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Inscriptos</p>
                    <p className="text-4xl font-bold text-[#124565]">{stats.total}</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#124565] to-[#25848d] flex items-center justify-center shadow-lg shadow-primary/30">
                    <Users className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-[#25848d]/10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#25848d] to-[#56bcb8]" />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Asistencia</p>
                    <p className="text-4xl font-bold text-[#25848d]">{stats.checkedIn}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stats.percentage}% del total
                    </p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#25848d] to-[#56bcb8] flex items-center justify-center shadow-lg shadow-secondary/30">
                    <UserCheck className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="mt-4 h-2.5 bg-[#f3f1ed] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#25848d] to-[#56bcb8] transition-all duration-500"
                    style={{ width: `${stats.percentage}%` }}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-[#D4A853]/10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4A853] to-[#E8C47A]" />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Check-ins Hoy</p>
                    <p className="text-4xl font-bold text-[#D4A853]">{stats.todayCheckins}</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#E8C47A] flex items-center justify-center shadow-lg shadow-accent/30">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg shadow-purple-500/10 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#124565] to-[#D4A853]" />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Encuestas</p>
                    <p className="text-4xl font-bold text-[#124565]">{stats.surveyResponses}</p>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#124565] to-[#D4A853] flex items-center justify-center shadow-lg shadow-primary/30">
                    <ClipboardCheck className="h-7 w-7 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border border-[#e8e6e1] shadow-sm hover:shadow-lg hover:shadow-[#124565]/10 transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#124565] to-[#25848d] flex items-center justify-center shadow-md shadow-primary/20">
                    <QrCode className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-[#124565]">Check-in Rápido</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Escaneá el QR o ingresá el DNI para validar asistentes
                </p>
                <Link href="/admin/checkin">
                  <Button className="w-full bg-gradient-to-r from-[#124565] to-[#25848d] hover:from-[#1a5a80] hover:to-[#2a9aa3] text-white shadow-lg shadow-primary/20 transition-all duration-200">
                    Ir a Check-in
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-[#e8e6e1] shadow-sm hover:shadow-lg hover:shadow-[#25848d]/10 transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#25848d] to-[#56bcb8] flex items-center justify-center shadow-md shadow-secondary/20">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-[#25848d]">Gestión de Usuarios</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Buscar, filtrar y exportar usuarios registrados
                </p>
                <Link href="/admin/users">
                  <Button variant="outline" className="w-full border-2 border-[#25848d] text-[#25848d] hover:bg-[#25848d] hover:text-white transition-all duration-200">
                    Ver Usuarios
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-[#e8e6e1] shadow-sm hover:shadow-lg hover:shadow-[#D4A853]/10 transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#D4A853] to-[#E8C47A] flex items-center justify-center shadow-md shadow-accent/20">
                    <QrCode className="h-5 w-5 text-white" />
                  </div>
                  <CardTitle className="text-lg text-[#D4A853]">Credenciales QR</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Descargar credenciales individuales o masivas
                </p>
                <Link href="/admin/credentials">
                  <Button variant="outline" className="w-full border-2 border-[#D4A853] text-[#D4A853] hover:bg-[#D4A853] hover:text-white transition-all duration-200">
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
        <Card className="p-12 text-center border border-[#e8e6e1] shadow-lg">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[#124565] to-[#25848d] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
            <Calendar className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#124565] mb-2">No hay evento activo</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Activá un evento desde la gestión de eventos para ver las estadísticas
          </p>
        </Card>
      )}
    </div>
  );
}
