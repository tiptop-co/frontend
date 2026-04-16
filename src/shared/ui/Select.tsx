interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

export const Select = ({ label, value, options, onChange }: SelectProps) => (
  <div className="mb-4 last:mb-0">
    {label && (
      <label className="block text-[13px] font-semibold text-muted mb-1.5">
        {label}
      </label>
    )}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-cream outline-none focus:border-terra font-sans appearance-none"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
)
