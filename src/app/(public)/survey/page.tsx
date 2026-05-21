'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Section, SectionTitle } from '@/components/sections/Section';
import { SurveyForm, type SurveyQuestion } from '@/components/forms/SurveyForm';
import { submitSurvey } from '@/app/actions/survey';
import { getActiveEventId } from '@/app/actions/checkin';

const questions: SurveyQuestion[] = [
  { id: 'overall', type: 'rating', question: '¿Cómo evaluarías el evento en general?', required: true },
  { id: 'content', type: 'rating', question: '¿Qué tan útiles fueron las charlas?', required: true },
  { id: 'organization', type: 'rating', question: '¿Cómo calificarías la organización?', required: true },
  { id: 'venue', type: 'rating', question: '¿El venue fue adecuado?', required: true },
  {
    id: 'recommend',
    type: 'select',
    question: '¿Recomendarías este evento?',
    required: true,
    options: [
      { value: '', label: 'Seleccionar' },
      { value: 'yes', label: 'Sí, sin duda' },
      { value: 'maybe', label: 'Tal vez' },
      { value: 'no', label: 'No' },
    ]
  },
  { id: 'comments', type: 'text', question: '¿Tenés algún comentario adicional?' },
];

export default function SurveyPage() {
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string>('');
  const [dni, setDni] = useState<string>('');
  const [dniError, setDniError] = useState<string>('');
  const [eventId, setEventId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadEventId() {
      const id = await getActiveEventId();
      setEventId(id);
      setLoading(false);
    }
    loadEventId();
  }, []);

  const handleAnswer = useCallback((questionId: string, value: string | number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    if (errors[questionId]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    }
  }, [errors]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const requiredQuestions = questions.filter(q => q.required);

    for (const q of requiredQuestions) {
      const answer = answers[q.id];
      if (answer === undefined || answer === '' || (Array.isArray(answer) && answer.length === 0)) {
        newErrors[q.id] = 'Esta pregunta es requerida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDni = (value: string): boolean => {
    const dniRegex = /^\d{7,8}$/;
    if (!value) {
      setDniError('El DNI es requerido');
      return false;
    }
    if (!dniRegex.test(value)) {
      setDniError('El DNI debe tener 7 u 8 dígitos numéricos');
      return false;
    }
    setDniError('');
    return true;
  };

  const handleSubmit = async () => {
    setSubmitError('');

    if (!validateDni(dni)) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    if (!eventId) {
      setSubmitError('No hay un evento activo');
      return;
    }

    setIsSubmitting(true);

    const result = await submitSurvey(eventId, dni, answers);

    if (!result.success) {
      setSubmitError(result.error || 'Error al enviar la encuesta');
      setIsSubmitting(false);
      return;
    }

    setSubmitted(true);
  };

  if (loading) {
    return (
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <p>Cargando...</p>
          </div>
        </Container>
      </Section>
    );
  }

  if (submitted) {
    return (
      <Section className="bg-muted/30">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12"
            >
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-2">¡Gracias por tu opinión!</h2>
              <p className="text-muted-foreground">
                Tus comentarios nos ayudan a mejorar el evento.
              </p>
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
            title="Encuesta de Satisfacción"
            subtitle="Tu opinión nos ayuda a mejorar"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2 mb-6">
                  <Label htmlFor="dni">DNI <span className="text-destructive">*</span></Label>
                  <Input
                    id="dni"
                    type="text"
                    inputMode="numeric"
                    placeholder="Tu número de DNI"
                    value={dni}
                    onChange={(e) => {
                      setDni(e.target.value);
                      if (dniError) validateDni(e.target.value);
                    }}
                  />
                  {dniError && (
                    <p className="text-sm text-destructive">{dniError}</p>
                  )}
                </div>
                <SurveyForm
                  questions={questions}
                  answers={answers}
                  onAnswer={handleAnswer}
                  onSubmit={handleSubmit}
                  errors={errors}
                  isLoading={isSubmitting}
                  submitError={submitError}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
