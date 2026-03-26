'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, QrCode, User, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface UserResult {
  dni: string;
  name: string;
  lastname: string;
  email: string;
  checkedIn: boolean;
  hasQR: boolean;
}

export default function CheckinPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<UserResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setLoading(true);
    // TODO: Connect to API
    setTimeout(() => {
      setResult({
        dni: searchTerm,
        name: 'Juan',
        lastname: 'Pérez',
        email: 'juan@example.com',
        checkedIn: false,
        hasQR: true,
      });
      setLoading(false);
    }, 500);
  };

  const handleCheckin = () => {
    if (result) {
      setResult({ ...result, checkedIn: true });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Panel de Check-in</h1>
          <p className="text-muted-foreground">Validá asistentes con DNI o código QR</p>
        </div>
        <Button variant="outline" className="gap-2">
          <QrCode className="h-4 w-4" />
          Escanear QR
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Buscar Asistente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Ingrese DNI..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar'}
              </Button>
            </div>

            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4"
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{result.name} {result.lastname}</p>
                    <p className="text-sm text-muted-foreground">DNI: {result.dni}</p>
                    <p className="text-sm text-muted-foreground">{result.email}</p>
                  </div>
                  <div>
                    {result.checkedIn ? (
                      <div className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="h-5 w-5" />
                        <span className="text-sm font-medium">Check-in completado</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <XCircle className="h-5 w-5" />
                        <span className="text-sm">Sin check-in</span>
                      </div>
                    )}
                  </div>
                </div>

                {!result.checkedIn && (
                  <Button onClick={handleCheckin} className="w-full mt-4">
                    Realizar Check-in
                  </Button>
                )}
              </motion.div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estadísticas de Hoy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Registrados</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 text-center">
                <p className="text-3xl font-bold">0</p>
                <p className="text-sm text-muted-foreground">Check-ins</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}