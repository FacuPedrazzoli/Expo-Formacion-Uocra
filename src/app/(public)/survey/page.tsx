'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/layout/Container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Section, SectionTitle } from '@/components/sections/Section';
import { SurveyForm, type SurveyQuestion } from '@/components/forms/SurveyForm';

const questions: SurveyQuestion[] = [
  { id: 'overall', type: 'rating', question: '¿Cómo evaluarías el evento en general?' },
  { id: 'content', type: 'rating', question: '¿Qué tan útiles fueron las charlas?' },
  { id: 'organization', type: 'rating', question: '¿Cómo calificarías la organización?' },
  { id: 'venue', type: 'rating', question: '¿El venue fue adecuado?' },
  { 
    id: 'recommend', 
    type: 'select', 
    question: '¿Recomendarías este evento?', 
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

  const handleAnswer = (questionId: string, value: string | number) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = () => {
    console.log('Survey answers:', answers);
    setSubmitted(true);
  };

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
                Tu feedback nos ayuda a mejorar el evento.
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
                <SurveyForm
                  questions={questions}
                  answers={answers}
                  onAnswer={handleAnswer}
                />
                <Button onClick={handleSubmit} className="w-full mt-8">
                  Enviar Encuesta
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}