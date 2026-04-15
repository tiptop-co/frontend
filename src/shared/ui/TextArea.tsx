interface TextAreaProps {
  label?: string
  value: string
  placeholder?: string
  rows?: number
  onChange: (value: string) => void
}

export const TextArea = ({
  label,
  value,
  placeholder,
  rows = 3,
  onChange,
}: TextAreaProps) => (
  <div className="mb-4 last:mb-0">
    {label && (
      <label className="block text-[13px] font-semibold text-muted mb-1.5">
        {label}
      </label>
    )}
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="w-full py-3 px-3.5 border border-muted-bg rounded-[10px] text-[15px] text-ink bg-cream outline-none focus:border-terra resize-none font-sans"
    />
  </div>
)
