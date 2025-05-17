"use client";

import React from 'react';
import { useCurrency } from '@/lib/currency-provider';

type PriceProps = {
  inr: number;
  usd: number;
  suffix?: string;
};

export const Price = ({ inr, usd, suffix = "onwards" }: PriceProps) => {
  const { currency } = useCurrency();

  return (
    <div className="flex items-center justify-center gap-1 relative z-10">
      <span className="text-2xl font-bold relative bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 to-zinc-600 dark:from-zinc-100 dark:to-zinc-400">
        <span className="text-base align-top mr-0.5">
          {currency === 'INR' ? '₹' : '$'}
        </span>
        {currency === 'INR' ? inr.toLocaleString() : usd.toLocaleString()}
      </span>
      {suffix && (
        <span className="text-sm font-normal text-zinc-500 dark:text-zinc-400 ml-1">
          {suffix}
        </span>
      )}
    </div>
  );
};
