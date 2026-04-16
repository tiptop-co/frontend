interface InputProps {
  label?: string
  type?: 'text' | 'email' | 'password' | 'tel' | 'number'
  value: string
  placeholder?: string
  disabled?: boolean
  hint?: string
  onChange: (value: string) => void
}

export const Input = ({
  label,
  type = 'text',
  value,
  placeholder,
  disabled,
  hint,
  onChange,
}: InputProps) => (
  <div className="mb-4 last:mb-0">
    {label && (
      <label className="block text-[13px] font-semibold text-muted mb-1.5">
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-cream outline-none focus:border-terra disabled:text-muted disabled:bg-muted-light font-sans"
    />
    {hint && <p className="text-xs text-muted mt-1.5">{hint}</p>}
  </div>
)
