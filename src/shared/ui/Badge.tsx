interface BadgeProps {
  label: string
  variant: 'unpaid' | 'paid' | 'free' | 'closed' | 'active' | 'pending'
}

const variantStyles: Record<BadgeProps['variant'], string> = {
  unpaid: 'bg-danger-light text-danger',
  paid: 'bg-forest-light text-forest',
  free: 'bg-muted-bg text-muted',
  closed: 'bg-muted-bg text-muted',
  active: 'bg-terra text-white',
  pending: 'bg-amber-100 text-amber-700',
}

export const Badge = ({ label, variant }: BadgeProps) => (
  <span
    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${variantStyles[variant]}`}
  >
    {label}
  </span>
)
