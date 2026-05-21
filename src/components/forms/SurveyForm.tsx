'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type SurveyQuestionType = 'rating' | 'select' | 'text';

export interface SurveyQuestion {
  id: string;
  type: SurveyQuestionType;
  question: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface RatingQuestionProps {
  question: string;
  value?: number;
  onChange: (value: number) => void;
  maxRating?: number;
  labels?: string[];
  required?: boolean;
}

export function RatingQuestion({
  question,
  value,
  onChange,
  maxRating = 5,
  labels = ['Muy malo', 'Malo', 'Regular', 'Bueno', 'Excelente'],
  required,
}: RatingQuestionProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium block">
        {question}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((rating) => (
          <motion.button
            key={rating}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(rating)}
            className={cn(
              'w-12 h-12 rounded-lg border-2 font-medium transition-colors',
              value === rating
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-background hover:border-primary/50'
            )}
          >
            {rating}
          </motion.button>
        ))}
      </div>
      {labels.length >= maxRating && (
        <div className="flex justify-between text-xs text-muted-foreground px-1">
          <span>{labels[0]}</span>
          <span>{labels[maxRating - 1]}</span>
        </div>
      )}
    </div>
  );
}

interface SelectQuestionProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

export function SelectQuestion({
  question,
  value,
  onChange,
  options,
  required,
}: SelectQuestionProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium block">
        {question}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

interface TextQuestionProps {
  question: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  required?: boolean;
}

export function TextQuestion({
  question,
  value,
  onChange,
  placeholder = 'Tu respuesta...',
  rows = 3,
  required,
}: TextQuestionProps) {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium block">
        {question}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
      />
    </div>
  );
}

interface SurveyFormProps {
  questions: SurveyQuestion[];
  answers: Record<string, string | number>;
  onAnswer: (questionId: string, value: string | number) => void;
  onSubmit?: () => void;
  errors?: Record<string, string>;
}

export function SurveyForm({
  questions,
  answers,
  onAnswer,
  onSubmit,
  errors = {},
}: SurveyFormProps) {
  const handleAnswer = useCallback((questionId: string, value: string | number) => {
    onAnswer(questionId, value);
  }, [onAnswer]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
      className="space-y-8"
    >
      {questions.map((q, index) => (
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="space-y-2"
        >
          {q.type === 'rating' && (
            <RatingQuestion
              question={q.question}
              value={answers[q.id] as number | undefined}
              onChange={(value) => handleAnswer(q.id, value)}
              required={q.required}
            />
          )}
          {q.type === 'select' && q.options && (
            <SelectQuestion
              question={q.question}
              value={answers[q.id] as string || ''}
              onChange={(value) => handleAnswer(q.id, value)}
              options={q.options}
              required={q.required}
            />
          )}
          {q.type === 'text' && (
            <TextQuestion
              question={q.question}
              value={answers[q.id] as string || ''}
              onChange={(value) => handleAnswer(q.id, value)}
              required={q.required}
            />
          )}
          {errors[q.id] && (
            <p className="text-sm text-destructive">{errors[q.id]}</p>
          )}
        </motion.div>
      ))}
    </form>
  );
}
