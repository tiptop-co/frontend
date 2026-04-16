export interface MenuCategory {
  id: string
  name: string
}

export interface Dish {
  id: string
  name: string
  description: string
  categoryId: string
  categoryName: string
  price: number
  weight: number
  weightUnit: 'г' | 'мл'
  calories?: number
  protein?: number
  fat?: number
  carbs?: number
  venueId: string
}

export interface MenuResponse {
  dishes: Dish[]
  categories: MenuCategory[]
}

export interface CreateDishDto {
  name: string
  description: string
  categoryId: string
  price: number
  weight: number
  weightUnit: 'г' | 'мл'
  calories?: number
  protein?: number
  fat?: number
  carbs?: number
}
