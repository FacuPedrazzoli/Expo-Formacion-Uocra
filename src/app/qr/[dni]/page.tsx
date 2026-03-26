'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import type { User as UserType } from '@/types/user';

type QRStatus = 'loading' | 'not_found' | 'not_checked' | 'checked' | 'survey';

export default function QRPage() {
  const params = useParams();
  const dni = params?.dni as string;
  
  const [status, setStatus] = useState<QRStatus>('loading');
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    async function fetchUser() {
      setTimeout(() => {
        setUser({
          id: '1',
          eventId: '1',
          dni: dni,
          name: 'Juan',
          lastname: 'Pérez',
          email: 'juan@example.com',
          userType: 'web',
          hasQR: false,
          checkedIn: false,
          createdAt: new Date().toISOString(),
        });
        setStatus('not_checked');
      }, 500);
    }

    if (dni) {
      fetchUser();
    }
  }, [dni]);

  const handleCheckin = () => {
    if (user) {
      setUser({ ...user, checkedIn: true });
      setStatus('checked');
    }
  };

  const handleGoToSurvey = () => {
    window.location.href = '/survey';
  };

  if (status === 'loading') {
    return (
      <Container className="py-12">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Buscando usuario...</p>
        </div>
      </Container>
    );
  }

  const statusConfig = {
    not_found: {
      icon: XCircle,
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      title: 'Usuario no encontrado',
      description: 'No existe registro con este DNI',
    },
    not_checked: {
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      title: 'Pendiente de check-in',
      description: 'Tu registro está confirmado. Por favor realizá el check-in.',
    },
    checked: {
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      title: 'Check-in completado',
      description: 'Ya estás registrado en el evento.',
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.not_found;
  const Icon = config.icon;

  return (
    <Container className="py-12">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader className="text-center">
              <div className={`w-16 h-16 rounded-full ${config.bgColor} flex items-center justify-center mx-auto mb-4`}>
                <Icon className={`w-8 h-8 ${config.color}`} />
              </div>
              <CardTitle className="text-xl">{config.title}</CardTitle>
            </CardHeader>
            
            <CardContent className="text-center">
              {user && (
                <div className="space-y-2 mb-6">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{user.name} {user.lastname}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">DNI: {user.dni}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              )}
              
              <p className="text-muted-foreground">{config.description}</p>
            </CardContent>

            <CardFooter className="flex flex-col gap-2">
              {status === 'not_checked' && (
                <Button onClick={handleCheckin} className="w-full">
                  Realizar Check-in
                </Button>
              )}
              
              {status === 'checked' && (
                <Button onClick={handleGoToSurvey} className="w-full">
                  Completar Encuesta
                </Button>
              )}
              
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full">
                  Volver al Inicio
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Container>
  );
}