import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'dark' | 'accent';
}

const variantClasses = {
  default: 'bg-slate-50',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-slate-100',
  dark: 'bg-slate-900 text-white',
  accent: 'bg-accent/5',
};

export function Section({ children, className, id, variant = 'default' }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-20 lg:py-24 relative overflow-hidden scroll-my-16', variantClasses[variant], className)}>
      {['default', 'secondary'].includes(variant) && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </>
      )}
      {variant === 'primary' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </>
      )}
      {variant === 'dark' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        </>
      )}
      {variant === 'accent' && (
        <>
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[#D4A853]/10 rounded-full blur-2xl" />
        </>
      )}
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
    <div className={cn('mb-10 md:mb-14', align === 'center' ? 'text-center' : 'text-left', className)}>
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