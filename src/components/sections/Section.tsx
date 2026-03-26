import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('py-12 md:py-16 lg:py-20', className)}>
      {children}
    </section>
  );
}

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, className, align = 'center' }: SectionTitleProps) {
  return (
    <div className={cn('mb-8 md:mb-12', align === 'center' ? 'text-center' : 'text-left', className)}>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

interface SectionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionContent({ children, className }: SectionContentProps) {
  return <div className={className}>{children}</div>;
}