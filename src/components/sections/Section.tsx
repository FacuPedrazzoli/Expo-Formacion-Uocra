import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'dark' | 'accent';
}

const variantClasses = {
  default: 'bg-[#f0f8fa]',
  primary: 'bg-primary text-primary-foreground',
  secondary: 'bg-[#e8f4f7]',
  dark: 'bg-[#1a1a2e] text-white',
  accent: 'bg-[#e8f4f7]',
};

export function Section({ children, className, id, variant = 'default' }: SectionProps) {
  return (
    <section id={id} className={cn('py-16 md:py-20 lg:py-24 relative overflow-hidden', variantClasses[variant], className)}>
      {/* Decorative geometric shapes for each section */}
      {variant === 'default' && (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute top-1/3 left-10 w-20 h-20 border border-accent/20 rotate-12" />
        </>
      )}
      {variant === 'primary' && (
        <>
          <div className="absolute top-10 right-10 w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[50px] border-b-white/10" />
          <div className="absolute bottom-10 left-1/4 w-32 h-32 border border-white/10 rotate-12" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#e2c048]/10 rounded-full blur-3xl" />
        </>
      )}
      {variant === 'secondary' && (
        <>
          <div className="absolute top-20 left-10 w-24 h-24 bg-primary/10 rounded-lg rotate-6" />
          <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/10 rounded-full" />
          <div className="absolute top-10 right-1/4 w-16 h-16 border border-primary/20 rotate-45" />
        </>
      )}
      {variant === 'dark' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/3" style={{ filter: 'blur(60px)' }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2" style={{ filter: 'blur(40px)' }} />
          <div className="absolute top-1/2 left-10 w-24 h-24 border border-accent/20 rotate-12" />
        </>
      )}
      {variant === 'accent' && (
        <>
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-[#e2c048]/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 border border-accent/20 rotate-12" />
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