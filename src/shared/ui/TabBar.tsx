import { NavLink } from 'react-router-dom'

interface TabItem {
  icon: string
  label: string
  to: string
}

interface TabBarProps {
  items: TabItem[]
}

export const TabBar = ({ items }: TabBarProps) => (
  <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-mobile bg-white border-t border-muted-bg flex justify-around py-2 pb-[max(env(safe-area-inset-bottom),12px)] z-20">
    {items.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) =>
          `flex flex-col items-center gap-0.5 text-[11px] no-underline px-3 py-1 ${isActive ? 'text-terra' : 'text-muted'}`
        }
      >
        <span className="text-[22px]">{item.icon}</span>
        {item.label}
      </NavLink>
    ))}
  </nav>
)
