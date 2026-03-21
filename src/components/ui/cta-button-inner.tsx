'use client'

import type { ReactNode } from 'react'
import { ButtonCtaIcon } from '@/components/ui/button'

/** Content wrapper for `variant="cta"` (icon in dark disc + label). */
export function CtaPrimaryInner({
  icon,
  children,
}: {
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <span className="inline-flex items-center gap-3">
      <ButtonCtaIcon>{icon}</ButtonCtaIcon>
      {children}
    </span>
  )
}

/** Content wrapper for `variant="ctaOutline"` (icon + label above hover fill). */
export function CtaOutlineInner({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2.5">{children}</span>
}
