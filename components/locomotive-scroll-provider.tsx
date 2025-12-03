"use client"

import { ReactNode, useEffect, useRef, useState } from 'react'

interface LocomotiveScrollProviderProps {
  children: ReactNode
}

export default function LocomotiveScrollProvider({ children }: LocomotiveScrollProviderProps) {
  // No-op provider: LocomotiveScroll removed per request, return children directly
  return <>{children}</>
}

