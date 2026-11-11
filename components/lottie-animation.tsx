"use client"

import { ReactNode, useRef, useEffect } from 'react'
import Lottie, { LottieRefCurrentProps } from 'lottie-react'

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
  const lottieRef = useRef<LottieRefCurrentProps>(null)

  useEffect(() => {
    if (lottieRef.current && speed !== 1) {
      lottieRef.current.setSpeed(speed)
    }
  }, [speed])

  // If no animation data is provided, show children or return null
  if (!customAnimationData) {
    if (children) {
      return <div className={className}>{children}</div>
    }
    return null
  }

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={customAnimationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      style={style}
    />
  )
}
