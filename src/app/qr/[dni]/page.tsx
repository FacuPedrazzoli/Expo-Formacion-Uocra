'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { getUserByDNI } from '@/app/actions/checkin';
import eventData from '@/data/event-data.json';

export default function QRPage() {
  const params = useParams();
  const dni = params?.dni as string;
  
  const [status, setStatus] = useState<'loading' | 'found' | 'not_found'>('loading');

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await getUserByDNI(dni);
        setStatus(user ? 'found' : 'not_found');
      } catch {
        setStatus('not_found');
      }
    }

    if (dni) {
      fetchUser();
    }
  }, [dni]);

  if (status === 'loading') {
    return (
      <Container className="py-12">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-primary">¡Te esperamos!</h1>
            </CardHeader>
            
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-foreground">
                Tu registro está confirmado para Expo Formación UOCRA 2026.
              </p>
              
              <div className="py-4 border-y">
                <p className="font-semibold text-lg">{eventData.eventInfo.date}</p>
                <p className="text-muted-foreground">{eventData.eventInfo.location}</p>
                <p className="text-sm text-muted-foreground">{eventData.eventInfo.address}</p>
              </div>

              <p className="text-sm text-muted-foreground">
                Presentá tu DNI en el ingreso para realizar el check-in.
              </p>
            </CardContent>

            <CardFooter className="flex justify-center">
              <Link href="/">
                <Button variant="outline">
                  Volver al inicio
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Container>
  );
}
