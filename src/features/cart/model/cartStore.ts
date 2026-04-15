import { create } from 'zustand'
import type { Dish } from '@/shared/types'

export interface CartItem {
  dish: Dish
  quantity: number
}

interface CartState {
  items: CartItem[]
  wishes: string
  addItem: (dish: Dish) => void
  removeItem: (dishId: string) => void
  updateQuantity: (dishId: string, quantity: number) => void
  setWishes: (wishes: string) => void
  clear: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  wishes: '',

  addItem: (dish) =>
    set((state) => {
      const existing = state.items.find((i) => i.dish.id === dish.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.dish.id === dish.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        }
      }
      return { items: [...state.items, { dish, quantity: 1 }] }
    }),

  removeItem: (dishId) =>
    set((state) => ({
      items: state.items.filter((i) => i.dish.id !== dishId),
    })),

  updateQuantity: (dishId, quantity) =>
    set((state) => {
      if (quantity <= 0) {
        return { items: state.items.filter((i) => i.dish.id !== dishId) }
      }
      return {
        items: state.items.map((i) =>
          i.dish.id === dishId ? { ...i, quantity } : i,
        ),
      }
    }),

  setWishes: (wishes) => set({ wishes }),

  clear: () => set({ items: [], wishes: '' }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.dish.price * i.quantity, 0),
}))
