'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Section, SectionTitle } from '@/components/sections/Section';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { registrationSchema, type RegistrationFormData } from '@/lib/validation/schemas';
import { registerUser } from '@/app/actions/register';

const SOURCE_OPTIONS = [
  { value: 'Redes sociales', label: 'Redes sociales' },
  { value: 'Boca a boca', label: 'Boca a boca' },
  { value: 'Correo electrónico', label: 'Correo electrónico' },
  { value: 'Carteleria/Volantes', label: 'Carteleria/Volantes' },
  { value: 'Otro', label: 'Otro' },
];

export default function RegisterPage() {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      surname: '',
      dni: '',
      email: '',
      source: undefined,
    },
  });

  const onSubmit = async (data: RegistrationFormData) => {
    setServerError(null);
    try {
      const result = await registerUser(data);
      if (result.success) {
        setSuccess(true);
      } else {
        setServerError(result.error || 'Error en el registro');
      }
    } catch {
      setServerError('Error inesperado. Intentá de nuevo.');
    }
  };

  if (success) {
    return (
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold text-green-600 mb-4">¡Registro exitoso!</h2>
                  <p className="text-muted-foreground">
                    Tu registro se completó correctamente. Te esperamos en Expo Formación UOCRA.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-muted/30">
      <Container>
        <div className="max-w-2xl mx-auto">
          <SectionTitle
            title="Registro al Evento"
            subtitle="Completá tus datos para asistir a Expo Formación UOCRA"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre <span className="text-destructive">*</span></Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Tu nombre"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="surname">Apellido <span className="text-destructive">*</span></Label>
                    <Input
                      id="surname"
                      type="text"
                      placeholder="Tu apellido"
                      {...register('surname')}
                    />
                    {errors.surname && (
                      <p className="text-sm text-destructive">{errors.surname.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dni">DNI <span className="text-destructive">*</span></Label>
                    <Input
                      id="dni"
                      type="text"
                      inputMode="numeric"
                      placeholder="Tu número de DNI"
                      {...register('dni')}
                    />
                    {errors.dni && (
                      <p className="text-sm text-destructive">{errors.dni.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email <span className="text-destructive">*</span></Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="source">¿Cómo te enteraste de la expo? <span className="text-destructive">*</span></Label>
                    <select
                      id="source"
                      {...register('source')}
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Seleccionar opción</option>
                      {SOURCE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    {errors.source && (
                      <p className="text-sm text-destructive">{errors.source.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <p className="text-sm text-destructive">{serverError}</p>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Registrando...' : 'Registrarse'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}