'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, User, Scan, RotateCcw, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { checkinUser, getActiveEventId, verifyUser } from '@/app/actions/checkin';
import { undoCheckin } from '@/app/actions/data';
import { userRepo } from '@/lib/repositories/userRepo';

interface CheckinResult {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
    lastname: string;
    dni: string;
  };
}

export default function CheckinPage() {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CheckinResult | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [todayCount, setTodayCount] = useState(0);
  const [lastUser, setLastUser] = useState<{ id: string; name: string; lastname: string; dni: string } | null>(null);

  useEffect(() => {
    getActiveEventId().then(id => {
      setEventId(id);
      if (id) loadTodayCount(id);
    });
  }, []);

  const loadTodayCount = async (id: string) => {
    const { getCheckinStats } = await import('@/app/actions/data');
    const stats = await getCheckinStats(id);
    setTodayCount(stats.todayCheckins);
  };

  const handleValidate = async () => {
    if (!dni.trim()) return;
    setLoading(true);
    setResult(null);
    
    try {
      const currentEventId = eventId || await getActiveEventId();
      if (!currentEventId) {
        setResult({ success: false, message: 'No hay evento activo' });
        setLoading(false);
        return;
      }
      
      const verifyResult = await verifyUser(dni.trim(), currentEventId);
      
      if (verifyResult.success) {
        setResult({
          success: true,
          message: `Listo para check-in - ${verifyResult.user?.name} ${verifyResult.user?.lastname}`,
          user: verifyResult.user ? {
            id: verifyResult.user.id,
            name: verifyResult.user.name,
            lastname: verifyResult.user.lastname,
            dni: verifyResult.user.dni,
          } : undefined,
        });
      } else {
        setResult({
          success: false,
          message: verifyResult.message,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setResult({ success: false, message: 'Error al procesar' });
    } finally {
      setLoading(false);
    }
  };

  const handleCheckin = async () => {
    if (!dni.trim()) return;
    setLoading(true);
    setResult(null);
    
    try {
      const currentEventId = eventId || await getActiveEventId();
      if (!currentEventId) {
        setResult({ success: false, message: 'No hay evento activo' });
        setLoading(false);
        return;
      }
      
      const checkinResult = await checkinUser(dni.trim(), currentEventId);
      
      if (checkinResult.success) {
        setLastUser({
          id: checkinResult.user!.id,
          name: checkinResult.user!.name,
          lastname: checkinResult.user!.lastname,
          dni: checkinResult.user!.dni,
        });
        setTodayCount(c => c + 1);
      }
      
      setResult({
        success: checkinResult.success,
        message: checkinResult.message,
        user: checkinResult.user ? {
          id: checkinResult.user.id,
          name: checkinResult.user.name,
          lastname: checkinResult.user.lastname,
          dni: checkinResult.user.dni,
        } : undefined,
      });
      
      if (checkinResult.success) {
        setDni('');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult({ success: false, message: 'Error al procesar' });
    } finally {
      setLoading(false);
    }
  };

  const handleUndo = async () => {
    if (!lastUser || !eventId) return;
    
    const userId = lastUser.id;
    const userName = lastUser.name;
    const userLastname = lastUser.lastname;
    
    setLoading(true);
    try {
      const { getCheckinStats } = await import('@/app/actions/data');
      const statsBefore = await getCheckinStats(eventId);
      const wasCheckedIn = statsBefore.checkedIn > 0 && lastUser;
      
      if (!wasCheckedIn) {
        setResult({ success: false, message: 'El usuario no está registrado en el evento' });
        setLoading(false);
        return;
      }
      
      const isStillCheckedIn = await userRepo.isCheckedIn(userId);
      if (!isStillCheckedIn) {
        setResult({ success: false, message: 'Este check-in ya fue deshecho por otro operador' });
        setLoading(false);
        return;
      }
      
      const success = await undoCheckin(userId, eventId);
      if (success) {
        setTodayCount(c => Math.max(0, c - 1));
        setResult({
          success: true,
          message: `Check-in deshecho para ${userName} ${userLastname}`,
        });
        setLastUser(null);
      } else {
        setResult({ success: false, message: 'Error al deshacer' });
      }
    } catch (error) {
      console.error('Error undoing:', error);
      setResult({ success: false, message: 'Error al deshacer' });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleValidate();
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Check-in</h1>
        <p className="text-muted-foreground">Ingresá el DNI o escaneá el código QR</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Check-ins Hoy</p>
                <p className="text-3xl font-bold">{todayCount}</p>
              </div>
              <Clock className="h-10 w-10 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        {lastUser && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-800">Último check-in</p>
                  <p className="font-semibold text-orange-900">{lastUser.name} {lastUser.lastname}</p>
                  <p className="text-xs text-orange-700">DNI: {lastUser.dni}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={handleUndo}
                  disabled={loading}
                  className="border-orange-300 text-orange-700 hover:bg-orange-100"
                >
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Deshacer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Validar Asistente
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <Input
              placeholder="Ingresá DNI..."
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-lg h-12"
              maxLength={8}
              minLength={7}
            />
            <Button 
              variant="outline"
              onClick={handleValidate} 
              disabled={loading || !dni.trim()}
              className="h-12 px-6"
            >
              {loading ? 'Buscando...' : 'Validar'}
            </Button>
            <Button 
              onClick={handleCheckin} 
              disabled={loading || !dni.trim()}
              className="h-12 px-6"
            >
              {loading ? 'Procesando...' : 'Check-in'}
            </Button>
          </div>

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-6 rounded-lg border ${
                result.success 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-4">
                {result.success ? (
                  <CheckCircle className="h-12 w-12 text-green-600" />
                ) : (
                  <XCircle className="h-12 w-12 text-red-600" />
                )}
                <div className="flex-1">
                  <p className={`text-xl font-semibold ${
                    result.success ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {result.message}
                  </p>
                  {result.success && result.user && (
                    <div className="flex items-center gap-2 mt-2 text-green-700">
                      <User className="h-4 w-4" />
                      <span>{result.user.name} {result.user.lastname}</span>
                      <span className="text-green-600">- DNI: {result.user.dni}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-medium mb-2">Cómo usar:</h3>
        <ol className="text-sm text-muted-foreground space-y-1">
          <li>1. Ingresá el DNI del asistente</li>
          <li>2. Hacé clic en &quot;Validar&quot; para verificar si está registrado</li>
          <li>3. Si está OK, hacé clic en &quot;Check-in&quot; para confirmar</li>
          <li>4. Si te equivocaste, podés deshacer el último check-in</li>
        </ol>
      </div>
    </div>
  );
}
