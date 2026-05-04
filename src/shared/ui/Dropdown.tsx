import { useEffect, useRef, useState } from 'react'

export interface DropdownOption {
  value: string
  label: string
  hint?: string
}

export interface DropdownGroup {
  label?: string
  options: DropdownOption[]
}

interface DropdownProps {
  value: string
  groups: DropdownGroup[]
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
}

export const Dropdown = ({
  value,
  groups,
  onChange,
  placeholder = 'Выберите…',
  disabled,
}: DropdownProps) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const allOptions = groups.flatMap((g) => g.options)
  const selected = allOptions.find((o) => o.value === value)

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className={`w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-white outline-none font-sans flex justify-between items-center text-left transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          open ? 'border-terra' : 'hover:border-[#d8d3ca]'
        }`}
      >
        <span className={selected ? 'text-ink' : 'text-[#B8B3AB]'}>
          {selected?.label ?? placeholder}
        </span>
        <span
          className={`ml-2 text-[#999] text-[12px] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 mt-1.5 bg-white border border-muted-bg rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] z-30 max-h-[280px] overflow-y-auto py-1">
          {groups.map((g, gi) => (
            <div key={gi}>
              {g.label && (
                <div className="px-3.5 pt-2 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[#999]">
                  {g.label}
                </div>
              )}
              {g.options.map((opt) => {
                const active = opt.value === value
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value)
                      setOpen(false)
                    }}
                    className={`w-full text-left px-3.5 py-2.5 text-[15px] flex items-center justify-between gap-3 transition-colors cursor-pointer ${
                      active
                        ? 'bg-cream text-terra font-semibold'
                        : 'text-ink hover:bg-cream/60'
                    }`}
                  >
                    <span className="flex flex-col">
                      <span>{opt.label}</span>
                      {opt.hint && (
                        <span className="text-[12px] text-[#999] font-normal mt-0.5">
                          {opt.hint}
                        </span>
                      )}
                    </span>
                    {active && <span className="text-terra text-sm">✓</span>}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
