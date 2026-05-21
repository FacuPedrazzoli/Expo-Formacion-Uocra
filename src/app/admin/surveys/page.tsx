'use client';

import { useState, useEffect, useCallback } from 'react';
import { ClipboardList, Download, Users, BarChart3, Eye, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { surveyService, SurveyQuestion } from '@/lib/services/surveyService';
import { getActiveEventId } from '@/app/actions/checkin';

export default function SurveysPage() {
  const [questions, setQuestions] = useState<SurveyQuestion[]>([]);
  const [answers, setAnswers] = useState<{ dni: string; answers: Record<string, unknown>; createdAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [eventId, setEventId] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<{ dni: string; answers: Record<string, unknown>; createdAt: string } | null>(null);
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    getActiveEventId().then(setEventId);
  }, []);

  useEffect(() => {
    if (eventId) {
      loadSurveyData();
    }
  }, [eventId, loadSurveyData]);

  const loadSurveyData = useCallback(async () => {
    if (!eventId) return;

    setLoading(true);
    try {
      const [questionsData, answersData] = await Promise.all([
        surveyService.getQuestions(eventId),
        surveyService.getAnswers(eventId),
      ]);
      setQuestions(questionsData);
      setAnswers(answersData);
    } catch (error) {
      console.error('Error loading survey data:', error);
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  const handleExportCSV = async () => {
    if (!eventId || answers.length === 0) return;

    setExporting(true);
    try {
      const headers = ['DNI', 'Fecha', ...questions.map(q => q.question)];
      const rows = answers.map(answer => [
        answer.dni,
        answer.createdAt,
        ...questions.map(q => {
          const answerValue = answer.answers[q.id];
          if (Array.isArray(answerValue)) return answerValue.join('; ');
          return String(answerValue ?? '');
        }),
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `encuestas_expo_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting:', error);
      alert('Error al exportar');
    } finally {
      setExporting(false);
    }
  };

  const getAnswerStats = (questionId: string) => {
    const relevantAnswers = answers
      .map(a => a.answers[questionId])
      .filter(a => a !== undefined && a !== null && a !== '');

    const total = relevantAnswers.length;
    const optionCounts: Record<string, number> = {};

    relevantAnswers.forEach(answer => {
      if (Array.isArray(answer)) {
        answer.forEach(opt => {
          optionCounts[opt] = (optionCounts[opt] || 0) + 1;
        });
      } else {
        const answerStr = String(answer);
        if (!optionCounts[answerStr]) optionCounts[answerStr] = 0;
        optionCounts[answerStr]++;
      }
    });

    return { total, optionCounts };
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case 'multiple_choice':
        return 'Opción múltiple';
      case 'text':
        return 'Texto libre';
      case 'rating':
        return 'Calificación';
      default:
        return type;
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="mb-8">
          <div className="h-9 w-48 bg-muted rounded-lg mb-2" />
          <div className="h-5 w-72 bg-muted rounded" />
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-36 bg-white rounded-2xl shadow-sm" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#124565]">Encuestas</h1>
          <p className="text-muted-foreground">{answers.length} respuestas registradas</p>
        </div>
        <Button
          onClick={handleExportCSV}
          disabled={exporting || answers.length === 0}
          className="flex items-center gap-2 bg-gradient-to-r from-[#124565] to-[#25848d] hover:from-[#1a5a80] hover:to-[#2a9aa3] text-white shadow-lg shadow-primary/20"
        >
          <Download className="h-4 w-4" />
          {exporting ? 'Exportando...' : 'Exportar CSV'}
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="border-0 shadow-lg shadow-[#124565]/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#124565] to-[#25848d]" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Respuestas</p>
                <p className="text-4xl font-bold text-[#124565]">{answers.length}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#124565] to-[#25848d] flex items-center justify-center shadow-lg shadow-primary/30">
                <ClipboardList className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-[#25848d]/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#25848d] to-[#56bcb8]" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Preguntas</p>
                <p className="text-4xl font-bold text-[#25848d]">{questions.length}</p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#25848d] to-[#56bcb8] flex items-center justify-center shadow-lg shadow-secondary/30">
                <BarChart3 className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg shadow-[#D4A853]/10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4A853] to-[#E8C47A]" />
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tasa de Respuesta</p>
                <p className="text-4xl font-bold text-[#D4A853]">
                  {questions.length > 0 ? Math.round((answers.length / (questions.length * 10)) * 100) : 0}%
                </p>
              </div>
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-[#D4A853] to-[#E8C47A] flex items-center justify-center shadow-lg shadow-accent/30">
                <Users className="h-7 w-7 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {questions.length === 0 ? (
        <Card className="p-12 text-center border border-[#e8e6e1] shadow-lg">
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-[#124565] to-[#25848d] flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/30">
            <ClipboardList className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-[#124565] mb-2">No hay encuestas disponibles</h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Aún no se han configurado preguntas de encuesta para este evento
          </p>
        </Card>
      ) : (
        <>
          <h2 className="text-xl font-bold text-[#124565] mb-4">Preguntas de la Encuesta</h2>
          <div className="grid gap-6 mb-8">
            {questions.map((question, index) => {
              const stats = getAnswerStats(question.id);
              const maxCount = Math.max(...Object.values(stats.optionCounts), 1);

              return (
                <Card key={question.id} className="border border-[#e8e6e1] shadow-sm overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#124565] to-[#25848d]" />
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#124565] to-[#25848d] flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                        <div>
                          <CardTitle className="text-base text-[#124565]">{question.question}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {getQuestionTypeLabel(question.question_type)}
                            </Badge>
                            {question.required && (
                              <Badge className="bg-[#D4A853] text-white text-xs">Requerida</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-[#124565]">{stats.total}</p>
                        <p className="text-xs text-muted-foreground">respuestas</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {question.options && question.options.length > 0 ? (
                      <div className="space-y-2">
                        {question.options.map((option) => {
                          const count = stats.optionCounts[option] || 0;
                          const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;

                          return (
                            <div key={option} className="flex items-center gap-3">
                              <div className="w-32 text-sm text-muted-foreground truncate">{option}</div>
                              <div className="flex-1 h-6 bg-[#f3f1ed] rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#124565] to-[#25848d] transition-all duration-500"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <div className="w-12 text-sm font-medium text-[#124565] text-right">
                                {count}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground italic">
                        Respuestas de texto libre ({stats.total} respuestas)
                      </p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#124565]">Respuestas Individuales</h2>
            <Badge className="bg-gradient-to-r from-[#124565] to-[#25848d] text-white">
              {answers.length} respuestas
            </Badge>
          </div>
          <Card className="border border-[#e8e6e1] shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left py-3 px-4 font-medium text-[#124565]">DNI</th>
                      <th className="text-left py-3 px-4 font-medium text-[#124565]">Fecha</th>
                      <th className="text-left py-3 px-4 font-medium text-[#124565]">Estado</th>
                      <th className="text-left py-3 px-4 font-medium text-[#124565]">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {answers.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-12 text-center text-muted-foreground">
                          No hay respuestas registradas
                        </td>
                      </tr>
                    ) : (
                      answers.map((answer) => (
                        <tr key={answer.dni} className="border-b hover:bg-muted/30">
                          <td className="py-3 px-4 font-mono text-[#124565]">{answer.dni}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {new Date(answer.createdAt).toLocaleDateString('es-AR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="py-3 px-4">
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle className="h-4 w-4" />
                              Completada
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedAnswer(answer)}
                              className="text-[#124565] hover:text-[#25848d] hover:bg-[#124565]/10"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {selectedAnswer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-auto border border-[#e8e6e1] shadow-xl">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#124565] to-[#25848d]" />
            <CardHeader className="sticky top-0 bg-white border-b border-[#e8e6e1]">
              <div className="flex items-center justify-between">
                <CardTitle className="text-[#124565]">Detalle de Respuesta</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedAnswer(null)}
                  className="text-muted-foreground"
                >
                  ✕
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                DNI: <span className="font-mono text-[#124565]">{selectedAnswer.dni}</span> |{' '}
                Fecha: {new Date(selectedAnswer.createdAt).toLocaleDateString('es-AR')}
              </p>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const answer = selectedAnswer.answers[question.id];
                  return (
                    <div key={question.id} className="border-b border-[#e8e6e1] pb-4 last:border-0">
                      <p className="text-sm font-medium text-[#124565] mb-1">
                        {index + 1}. {question.question}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {answer === undefined || answer === null || answer === ''
                          ? <span className="italic">Sin respuesta</span>
                          : Array.isArray(answer)
                          ? answer.join(', ')
                          : String(answer)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
