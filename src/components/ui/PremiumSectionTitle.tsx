'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface PremiumSectionTitleProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  centered?: boolean;
}

export function PremiumSectionTitle({ 
  title, 
  subtitle, 
  icon, 
  centered = true 
}: PremiumSectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      viewport={{ once: true }}
      className={cn('mb-10 md:mb-14', centered ? 'text-center' : 'text-left')}
    >
      <div className="relative inline-block">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#D4A853] to-[#F4D03F] bg-clip-text text-transparent">
          {title}
        </h2>
        <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#D4A853]/50 to-transparent" />
      </div>
      
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}