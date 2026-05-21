'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Calendar, MapPin, Mail, Phone, User, Edit2, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getUserById, updateUser, getUserSurveyAnswers, undoCheckin } from '@/app/actions/data';
import { getActiveEventId } from '@/app/actions/checkin';
import type { User } from '@/types/user';

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', lastname: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, unknown> | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);
  const [undoing, setUndoing] = useState(false);

  useEffect(() => {
    getActiveEventId().then(setEventId);
  }, []);

  useEffect(() => {
    if (eventId) {
      loadUser();
    }
  }, [params.id, eventId]);

  async function loadUser() {
    if (!eventId) return;
    try {
      const userData = await getUserById(params.id as string);
      if (userData) {
        setUser(userData);
        setEditForm({
          name: userData.name,
          lastname: userData.lastname,
          email: userData.email,
          phone: userData.phone || '',
        });
        
        const survey = await getUserSurveyAnswers(eventId, userData.dni);
        if (survey) {
          setSurveyAnswers(survey.answers_json as Record<string, unknown>);
        }
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!user) return;
    
    if (!editForm.name.trim() || !editForm.lastname.trim() || !editForm.email.trim()) {
      alert('Los campos nombre, apellido y email son requeridos');
      return;
    }
    
    setSaving(true);
    try {
      const success = await updateUser(user.id, editForm);
      if (success) {
        setUser({ ...user, ...editForm });
        setEditing(false);
      } else {
        alert('Error al guardar');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error al guardar');
    } finally {
      setSaving(false);
    }
  }

  async function handleUndoCheckin() {
    if (!user || !eventId) return;
    
    setUndoing(true);
    try {
      const success = await undoCheckin(user.id, eventId);
      if (success) {
        setUser({ ...user, checkedIn: false, checkedInAt: undefined });
      } else {
        alert('Error al deshacer');
      }
    } catch (error) {
      console.error('Error undoing:', error);
      alert('Error al deshacer');
    } finally {
      setUndoing(false);
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-muted rounded mb-6" />
        <div className="h-64 bg-muted rounded" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Usuario no encontrado</p>
        <Button variant="outline" onClick={() => router.back()} className="mt-4">
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">
            {user.name} {user.lastname}
          </h1>
          <p className="text-muted-foreground">DNI: {user.dni}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Datos Personales
              </span>
              {!editing ? (
                <Button size="sm" variant="ghost" onClick={() => setEditing(true)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => setEditing(false)}>
                    Cancelar
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={saving}>
                    <Save className="h-4 w-4 mr-1" />
                    {saving ? 'Guardando...' : 'Guardar'}
                  </Button>
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground">Nombre</label>
                {editing ? (
                  <Input
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{user.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-muted-foreground">Apellido</label>
                {editing ? (
                  <Input
                    value={editForm.lastname}
                    onChange={(e) => setEditForm({ ...editForm, lastname: e.target.value })}
                  />
                ) : (
                  <p className="font-medium">{user.lastname}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" /> Email
              </label>
              {editing ? (
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-muted-foreground flex items-center gap-1">
                <Phone className="h-3 w-3" /> Teléfono
              </label>
              {editing ? (
                <Input
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="Sin teléfono"
                />
              ) : (
                <p>{user.phone || 'No especificado'}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-muted-foreground">Tipo de registro</label>
              <p><Badge variant="outline">{user.userType === 'web' ? 'Web' : 'Manual'}</Badge></p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Fecha de registro
              </label>
              <p>{new Date(user.createdAt).toLocaleDateString('es-AR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {user.checkedIn ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-muted-foreground" />
                )}
                Estado de Check-in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-lg font-semibold ${user.checkedIn ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {user.checkedIn ? 'Registrado' : 'No registrado'}
                  </p>
                  {user.checkedInAt && (
                    <p className="text-sm text-muted-foreground">
                      el {new Date(user.checkedInAt).toLocaleDateString('es-AR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  )}
                </div>
                {user.checkedIn && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleUndoCheckin}
                    disabled={undoing}
                  >
                    {undoing ? 'Deshaciendo...' : 'Deshacer check-in'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Credencial QR
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.qrCode ? (
                <div className="text-center">
                  <img 
                    src={user.qrCode} 
                    alt="QR Code" 
                    className="w-48 h-48 mx-auto border rounded-lg"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Código: {user.qrCode.substring(0, 20)}...
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">No disponible</p>
              )}
            </CardContent>
          </Card>

          {surveyAnswers && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  Encuesta Completada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(surveyAnswers).map(([key, value]) => (
                    <div key={key} className="border-b pb-2 last:border-0">
                      <p className="text-sm text-muted-foreground">{key}</p>
                      <p className="font-medium">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {!surveyAnswers && (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                <svg className="h-8 w-8 mx-auto mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                </svg>
                <p>No completó la encuesta</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
