"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { getCookie } from 'cookies-next';

type Currency = 'USD' | 'INR';

interface CurrencyContextProps {
  currency: Currency;
}

export const CurrencyContext = createContext<CurrencyContextProps>({
  currency: 'USD',
});

export const useCurrency = () => useContext(CurrencyContext);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  
  // Initialize currency from cookie on component mount (set by middleware)
  useEffect(() => {
    const savedCurrency = getCookie('currency') as Currency;
    if (savedCurrency && (savedCurrency === 'USD' || savedCurrency === 'INR')) {
      setCurrencyState(savedCurrency);
    } else {
      // Default to USD if no valid cookie exists
      setCurrencyState('USD');
    }
  }, []);

  return (
    <CurrencyContext.Provider value={{ currency }}>
      {children}
    </CurrencyContext.Provider>
  );
}
