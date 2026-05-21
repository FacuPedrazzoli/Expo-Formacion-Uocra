'use client';

import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, Calendar, MapPin, Mail, Phone, User, Edit2, Save } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { getUserById, updateUser, getUserSurveyAnswers, undoCheckin } from '@/app/actions/data';
import { getActiveEventId } from '@/app/actions/checkin';
import type { User as UserType } from '@/types/user';

export default function UserDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [user, setUser] = useState<UserType | null>(null);
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
  }, [params.id, eventId, loadUser]);

  const loadUser = useCallback(async () => {
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
  }, [eventId, params.id]);

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
        <div className="h-8 w-48 bg-gradient-to-r from-[#124565] to-[#25848d] rounded mb-6" />
        <div className="h-64 bg-gradient-to-r from-[#124565] to-[#25848d] rounded" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-[#124565]">Usuario no encontrado</p>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-4 bg-gradient-to-r from-[#124565] to-[#25848d] text-white border-0 hover:opacity-90"
        >
          Volver
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="border border-[#e8e6e1] shadow-sm hover:bg-gradient-to-r hover:from-[#124565] hover:to-[#25848d] hover:text-white hover:border-transparent"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[#124565]">
            {user.name} {user.lastname}
          </h1>
          <p className="text-[#25848d]">DNI: {user.dni}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-[#e8e6e1] shadow-sm bg-gradient-to-br from-white to-[#faf9f7]">
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-[#124565]">
              <span className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#25848d]" />
                Datos Personales
              </span>
              {!editing ? (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditing(true)}
                  className="bg-gradient-to-r from-[#124565] to-[#25848d] text-white shadow hover:opacity-90"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditing(false)}
                    className="border border-[#e8e6e1]"
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-gradient-to-r from-[#124565] to-[#25848d] text-white shadow hover:opacity-90"
                  >
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
              <label className="text-sm text-[#124565] font-medium">Nombre</label>
              {editing ? (
                <Input
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="focus:border-[#124565] focus:ring-[#124565] border-[#e8e6e1]"
                />
              ) : (
                <p className="font-medium text-[#25848d]">{user.name}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-[#124565] font-medium">Apellido</label>
              {editing ? (
                <Input
                  value={editForm.lastname}
                  onChange={(e) => setEditForm({ ...editForm, lastname: e.target.value })}
                  className="focus:border-[#124565] focus:ring-[#124565] border-[#e8e6e1]"
                />
              ) : (
                <p className="font-medium text-[#25848d]">{user.lastname}</p>
              )}
            </div>
            </div>

            <div>
              <label className="text-sm text-[#124565] font-medium flex items-center gap-1">
                <Mail className="h-3 w-3 text-[#25848d]" /> Email
              </label>
              {editing ? (
                <Input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="focus:border-[#124565] focus:ring-[#124565] border-[#e8e6e1]"
                />
              ) : (
                <p className="text-[#25848d]">{user.email}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-[#124565] font-medium flex items-center gap-1">
                <Phone className="h-3 w-3 text-[#25848d]" /> Teléfono
              </label>
              {editing ? (
                <Input
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  placeholder="Sin teléfono"
                  className="focus:border-[#124565] focus:ring-[#124565] border-[#e8e6e1]"
                />
              ) : (
                <p className="text-[#25848d]">{user.phone || 'No especificado'}</p>
              )}
            </div>

            <div>
              <label className="text-sm text-[#124565] font-medium">Tipo de registro</label>
              <p><Badge className="bg-gradient-to-r from-[#124565] to-[#25848d] text-white border-0">{user.userType === 'web' ? 'Web' : 'Manual'}</Badge></p>
            </div>

            <div>
              <label className="text-sm text-[#124565] font-medium flex items-center gap-1">
                <Calendar className="h-3 w-3 text-[#25848d]" /> Fecha de registro
              </label>
              <p className="text-[#25848d]">{new Date(user.createdAt).toLocaleDateString('es-AR', {
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
          <Card className="border-[#e8e6e1] shadow-sm bg-gradient-to-br from-white to-[#faf9f7]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#124565]">
                {user.checkedIn ? (
                  <CheckCircle className="h-5 w-5 text-[#D4A853]" />
                ) : (
                  <XCircle className="h-5 w-5 text-[#25848d]" />
                )}
                Estado de Check-in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-lg font-semibold ${user.checkedIn ? 'text-[#D4A853]' : 'text-[#25848d]'}`}>
                    {user.checkedIn ? 'Registrado' : 'No registrado'}
                  </p>
                  {user.checkedInAt && (
                    <p className="text-sm text-[#25848d]">
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
                    className="border-[#e8e6e1] text-[#124565] hover:bg-gradient-to-r hover:from-[#124565] hover:to-[#25848d] hover:text-white hover:border-transparent"
                  >
                    {undoing ? 'Deshaciendo...' : 'Deshacer check-in'}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#e8e6e1] shadow-sm bg-gradient-to-br from-white to-[#faf9f7]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#124565]">
                <MapPin className="h-5 w-5 text-[#25848d]" />
                Credencial QR
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.qrCode ? (
                <div className="text-center">
                  <Image
                    src={user.qrCode}
                    alt="QR Code"
                    width={192}
                    height={192}
                    className="mx-auto border-2 border-[#e8e6e1] rounded-lg"
                  />
                  <p className="text-sm text-[#25848d] mt-2">
                    Código: {user.qrCode.substring(0, 20)}...
                  </p>
                </div>
              ) : (
                <p className="text-[#25848d]">No disponible</p>
              )}
            </CardContent>
          </Card>

          {surveyAnswers && (
            <Card className="border-[#e8e6e1] shadow-sm bg-gradient-to-br from-white to-[#faf9f7]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#124565]">
                  <svg className="h-5 w-5 text-[#D4A853]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 11l3 3L22 4" />
                    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
                  </svg>
                  Encuesta Completada
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Object.entries(surveyAnswers).map(([key, value]) => (
                    <div key={key} className="border-b border-[#e8e6e1] pb-2 last:border-0">
                      <p className="text-sm text-[#124565] font-medium">{key}</p>
                      <p className="text-[#25848d]">{String(value)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {!surveyAnswers && (
            <Card className="border-[#e8e6e1] shadow-sm bg-gradient-to-br from-white to-[#faf9f7]">
              <CardContent className="py-8 text-center text-[#25848d]">
                <svg className="h-8 w-8 mx-auto mb-2 opacity-50 text-[#25848d]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
