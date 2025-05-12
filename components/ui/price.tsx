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
      <span className="text-3xl font-bold relative bg-clip-text text-transparent bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-100">
        <span className="text-base align-top mr-0.5">
          {currency === 'INR' ? '₹' : '$'}
        </span>
        {currency === 'INR' ? inr : usd}
      </span>
      {suffix && (
        <span className="text-base font-normal text-zinc-600 dark:text-zinc-400 ml-1">
          {suffix}
        </span>
      )}
    </div>
  );
};
