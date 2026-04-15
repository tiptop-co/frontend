import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export const Card = ({ children, className = '', onClick }: CardProps) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-[14px] p-4 shadow-card ${onClick ? 'cursor-pointer active:opacity-95' : ''} ${className}`}
  >
    {children}
  </div>
)
