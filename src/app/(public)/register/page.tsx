'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Section, SectionTitle } from '@/components/sections/Section';

interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

const formFields: FormField[] = [
  { name: 'name', label: 'Nombre', type: 'text', required: true, placeholder: 'Tu nombre' },
  { name: 'lastname', label: 'Apellido', type: 'text', required: true, placeholder: 'Tu apellido' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'tu@email.com' },
  { name: 'dni', label: 'DNI', type: 'number', required: true, placeholder: 'Tu número de DNI' },
  { name: 'how_found', label: '¿Cómo nos conociste?', type: 'select', options: [
    { value: '', label: 'Seleccionar opción' },
    { value: 'social', label: 'Redes sociales' },
    { value: 'email', label: 'Correo electrónico' },
    { value: 'referral', label: 'Recomendación' },
    { value: 'press', label: 'Prensa' },
    { value: 'other', label: 'Otro' },
  ]},
];

export default function RegisterPage() {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
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
                  <form className="space-y-6">
                    {formFields.map((field) => (
                      <div key={field.name} className="space-y-2">
                        <label htmlFor={field.name} className="text-sm font-medium">
                          {field.label}
                          {field.required && <span className="text-destructive"> *</span>}
                        </label>
                        {field.type === 'select' ? (
                          <select
                            id={field.name}
                            name={field.name}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          >
                            {field.options?.map((opt) => (
                              <option key={opt.value} value={opt.value}>
                                {opt.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={handleChange}
                            className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        )}
                      </div>
                    ))}

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Seleccionar Charlas</label>
                      <div className="space-y-2 p-4 border rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground">
                          Las charlas disponibles se mostrarán aquí. Podrás seleccionar múltiples.
                        </p>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                    >
                      Registrarse
                    </button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </Container>
      </Section>
    </>
  );
}