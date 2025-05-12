"use client";

import React, { ReactNode } from 'react';
import { CurrencyProvider } from '@/lib/currency-provider';

interface ServicesLayoutProps {
  children: ReactNode;
}

export default function ServicesLayout({ children }: ServicesLayoutProps) {
  return (
    <CurrencyProvider>
      {children}
    </CurrencyProvider>
  );
}
