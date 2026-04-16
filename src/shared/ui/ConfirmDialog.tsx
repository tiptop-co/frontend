import { create } from 'zustand'

interface ConfirmState {
  isOpen: boolean
  title: string
  message: string
  resolve: ((value: boolean) => void) | null
  open: (title: string, message: string) => Promise<boolean>
  close: (result: boolean) => void
}

export const useConfirmStore = create<ConfirmState>((set, get) => ({
  isOpen: false,
  title: '',
  message: '',
  resolve: null,
  open: (title, message) =>
    new Promise<boolean>((resolve) => {
      set({ isOpen: true, title, message, resolve })
    }),
  close: (result) => {
    const { resolve } = get()
    resolve?.(result)
    set({ isOpen: false, title: '', message: '', resolve: null })
  },
}))

export const confirm = (title: string, message: string) =>
  useConfirmStore.getState().open(title, message)

export const ConfirmDialog = () => {
  const { isOpen, title, message, close } = useConfirmStore()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => close(false)}
      />
      <div className="relative bg-white rounded-2xl mx-6 w-full max-w-[340px] p-6 shadow-xl">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-sm text-[#666] mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3">
          <button
            onClick={() => close(false)}
            className="flex-1 py-3 rounded-xl border-[1.5px] border-muted-bg bg-white text-ink text-[15px] font-semibold cursor-pointer active:opacity-90"
          >
            Отмена
          </button>
          <button
            onClick={() => close(true)}
            className="flex-1 py-3 rounded-xl border-none bg-danger text-white text-[15px] font-semibold cursor-pointer active:opacity-90"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
