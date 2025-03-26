import { LinearGradient } from 'expo-linear-gradient';
import React, { FunctionComponent } from 'react';

import { cn } from '~/lib/cn';

interface BankGradientCardProps {
  children: React.ReactNode;
  className?: string;
}

const BankGradientCard: FunctionComponent<BankGradientCardProps> = ({ children, className }) => {
  return (
    <LinearGradient
      className={cn('p-4', className)}
      colors={['#4f46e5', '#a855f7']}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 0 }}
      style={{ borderRadius: 8 }}>
      {children}
    </LinearGradient>
  );
};

export default BankGradientCard;
