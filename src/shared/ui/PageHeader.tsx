import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  onBack?: () => void
  right?: ReactNode
}

export const PageHeader = ({ title, onBack, right }: PageHeaderProps) => (
  <div className="sticky top-0 z-10 bg-cream px-5 pt-4 pb-3 flex items-center gap-3">
    {onBack && (
      <button
        onClick={onBack}
        className="text-2xl text-ink bg-transparent border-none cursor-pointer"
      >
        &larr;
      </button>
    )}
    <h1 className="text-2xl font-bold flex-1">{title}</h1>
    {right}
  </div>
)
