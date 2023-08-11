export interface UserCredentails {
  email: string
  password: string
}

export interface UserDataStructure {
  pk: number
  username: string
  email: string
  first_name: string
  last_name: string
  countryISO: string
  phone_number: string
  company_name: string
  street: string
  streetNo: string
  city: string
  postalCode: string
  is_verified: boolean
  has_pending_terms: boolean
  groups: string[]
  addons: {
    slug: string
    settings: {}
  }[]
  timezone: string
  use_metric_format: boolean
  use_24_hour_format: boolean
  dashboards: {
    id: number
    default: boolean
  }[]
  has_devices: boolean
  device_count: number
}

export interface TopBarStructure {
  route: string
  isNavbarOpen: boolean
}