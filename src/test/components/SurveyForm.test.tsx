import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SurveyForm, RatingQuestion, SelectQuestion, TextQuestion } from '@/components/forms/SurveyForm';

describe('RatingQuestion', () => {
  it('renderiza todas las opciones de rating', () => {
    const onChange = vi.fn();
    render(
      <RatingQuestion
        question="¿Cómo fue el evento?"
        value={undefined}
        onChange={onChange}
        maxRating={5}
      />
    );
    
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(5);
  });

  it('llama onChange con el valor correcto al hacer click', () => {
    const onChange = vi.fn();
    render(
      <RatingQuestion
        question="¿Cómo fue el evento?"
        value={undefined}
        onChange={onChange}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: '3' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('marca el valor seleccionado', () => {
    const onChange = vi.fn();
    render(
      <RatingQuestion
        question="¿Cómo fue el evento?"
        value={4}
        onChange={onChange}
      />
    );
    
    const selectedButton = screen.getByRole('button', { name: '4' });
    expect(selectedButton).toHaveClass('border-primary');
  });
});

describe('SelectQuestion', () => {
  it('renderiza todas las opciones', () => {
    const onChange = vi.fn();
    const options = [
      { value: 'op1', label: 'Opción 1' },
      { value: 'op2', label: 'Opción 2' },
    ];
    
    render(
      <SelectQuestion
        question="¿Qué prefieres?"
        value=""
        onChange={onChange}
        options={options}
      />
    );
    
    expect(screen.getByRole('combobox')).toBeTruthy();
    expect(screen.getByText('Opción 1')).toBeTruthy();
    expect(screen.getByText('Opción 2')).toBeTruthy();
  });

  it('llama onChange al cambiar selección', () => {
    const onChange = vi.fn();
    const options = [
      { value: 'op1', label: 'Opción 1' },
      { value: 'op2', label: 'Opción 2' },
    ];
    
    render(
      <SelectQuestion
        question="¿Qué prefieres?"
        value=""
        onChange={onChange}
        options={options}
      />
    );
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'op2' } });
    expect(onChange).toHaveBeenCalledWith('op2');
  });
});

describe('TextQuestion', () => {
  it('renderiza textarea', () => {
    const onChange = vi.fn();
    render(
      <TextQuestion
        question="¿Comentarios?"
        value=""
        onChange={onChange}
      />
    );
    
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('llama onChange al escribir', () => {
    const onChange = vi.fn();
    render(
      <TextQuestion
        question="¿Comentarios?"
        value=""
        onChange={onChange}
      />
    );
    
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Nuevo texto' } });
    expect(onChange).toHaveBeenCalledWith('Nuevo texto');
  });

  it('usa placeholder personalizado', () => {
    const onChange = vi.fn();
    render(
      <TextQuestion
        question="¿Comentarios?"
        value=""
        onChange={onChange}
        placeholder="Escribí acá..."
      />
    );
    
    expect(screen.getByPlaceholderText('Escribí acá...')).toBeTruthy();
  });
});

describe('SurveyForm', () => {
  const mockQuestions = [
    { id: 'q1', type: 'rating' as const, question: '¿Cómo fue?', required: true },
    { id: 'q2', type: 'select' as const, question: '¿Recomendado?', options: [{ value: 'si', label: 'Sí' }, { value: 'no', label: 'No' }] },
    { id: 'q3', type: 'text' as const, question: 'Comentarios', required: false },
  ];

  it('renderiza preguntas de rating', () => {
    render(
      <SurveyForm
        questions={[mockQuestions[0]]}
        answers={{}}
        onAnswer={vi.fn()}
      />
    );
    
    expect(screen.getByText('¿Cómo fue?')).toBeTruthy();
  });

  it('renderiza preguntas de select', () => {
    render(
      <SurveyForm
        questions={[mockQuestions[1]]}
        answers={{}}
        onAnswer={vi.fn()}
      />
    );
    
    expect(screen.getByText('¿Recomendado?')).toBeTruthy();
    expect(screen.getByRole('combobox')).toBeTruthy();
  });

  it('renderiza preguntas de texto', () => {
    render(
      <SurveyForm
        questions={[mockQuestions[2]]}
        answers={{}}
        onAnswer={vi.fn()}
      />
    );
    
    expect(screen.getByText('Comentarios')).toBeTruthy();
    expect(screen.getByRole('textbox')).toBeTruthy();
  });

  it('llama onAnswer al responder', () => {
    const onAnswer = vi.fn();
    render(
      <SurveyForm
        questions={[mockQuestions[0]]}
        answers={{}}
        onAnswer={onAnswer}
      />
    );
    
    fireEvent.click(screen.getByRole('button', { name: '5' }));
    expect(onAnswer).toHaveBeenCalledWith('q1', 5);
  });

  it('renderiza sin errores por defecto', () => {
    render(
      <SurveyForm
        questions={mockQuestions}
        answers={{}}
        onAnswer={vi.fn()}
      />
    );
    
    expect(screen.queryByRole('alert')).toBeNull();
  });

  it('muestra errores cuando existen', () => {
    render(
      <SurveyForm
        questions={[{ id: 'q1', type: 'rating' as const, question: 'Pregunta' }]}
        answers={{}}
        onAnswer={vi.fn()}
        errors={{ q1: 'Error en pregunta' }}
      />
    );
    
    expect(screen.getByText('Error en pregunta')).toBeTruthy();
  });

  it('handleSubmit sin onSubmit no falla', () => {
    const onSubmit = vi.fn();
    render(
      <SurveyForm
        questions={mockQuestions}
        answers={{}}
        onAnswer={vi.fn()}
        onSubmit={onSubmit}
      />
    );
    
    const form = screen.getByText('¿Cómo fue?').closest('form')!;
    fireEvent.submit(form);
    expect(onSubmit).toHaveBeenCalled();
  });
});