"use client"

import { ReactNode } from 'react'
import Lottie from 'lottie-react'

interface LottieAnimationProps {
  animationData?: any
  loop?: boolean
  autoplay?: boolean
  className?: string
  style?: React.CSSProperties
  speed?: number
  children?: ReactNode
}

export default function LottieAnimation({
  animationData: customAnimationData,
  loop = true,
  autoplay = true,
  className = '',
  style,
  speed = 1,
  children,
}: LottieAnimationProps) {
  // If no animation data is provided, show children or return null
  if (!customAnimationData) {
    if (children) {
      return <div className={className}>{children}</div>
    }
    return null
  }

  return (
    <Lottie
      animationData={customAnimationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
      speed={speed}
    />
  )
}

