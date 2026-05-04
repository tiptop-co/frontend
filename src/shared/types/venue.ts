export interface Venue {
  id: string
  name: string
  address: string
  description?: string
  bankAccount?: string
  managerId?: string
}

export interface UpdateVenueDto {
  name: string
  address: string
  description?: string
  bankAccount?: string
}
