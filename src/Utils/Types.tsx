import { Timestamp } from 'firebase/firestore'

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

export interface Vehicle {
  id: number
  vin: string
  display: string
  callName: string
  licensePlate: string
  model: number
  make: number
  year: number
  type: VehicleType
  battery_nominal_voltage: number
}

export interface Release {
  version: string
  active: boolean
}

export interface Warning {
  outdated_version: {
    header: string
    message: string
  }
}

export interface DongleData {
  id: string
  unit_id: string
  token: string
  callName: string
  owner: number
  vehicle: Vehicle
  display: string
  last_communication: string
  is_updated: boolean
  release: Release
  open_alerts: {
    high: number
    medium: number
    critical: number
    low: number
  }
  template: {} // Type accordingly
  warnings: Warning[]
  key_state: string
  access: AccessLevel
  docker_releases: [] // Type accordingly
  is_blocked_by_release: boolean
  geofences: [] // Type accordingly
  tags: {} // Type accordingly
  wifi_pass: string
  is_update_enqueued: boolean
  pending_sync_count: number
  user_metadata: []
  imei: string
  icc: string
  phone_number: string
  max_data_usage: number
  data_usage: number
  secure_element_serial_number: string
  ethereum_address: string
  hw_revision: string
  hw_board_ver: string
  hw_modem: string
}

export interface Trip {
  city: string
  license: string
  country: string
  provider: string
  precision: string
  longitude: string
  county: string
  raw: {
    category: string
    place_id: number
    display_name: string
    name: string
    importance: number
    osm_id: number
    lon: string
    boundingbox: []
    osm_type: string
    addresstype: string
    place_rank: number
    licence: string
    address: {
      city: string
      country: string
      county: string
      state: string
      'ISO3166-2-lvl4': string
      postcode: string
      country_code: string
      road: string
    }
    lat: string
    type: string
  }
  postal_code: string
  country_code: string
  address: string
  latitude: string
  ntk_geocode_time: number
}

export interface TripData {
  id: string
  start_time_utc: string
  end_time_utc: string
  start_position_lat: string
  start_position_lng: string
  start_position_display: Trip
  end_position_lat: string
  end_position_lng: string
  end_position_display: Trip
  device: string
  duration: string
  distanceKm: number
  tag: string
}

export interface ApiResponse {
  count: number
  results: DongleData[]
  page_size: number
}

export interface ChipItem {
  id: number
  title: string
  dataType: string
}

//ENUMS

export enum VehicleType {
  ICE = 'ICE',
  Electric = 'Electric',
  Hybrid = 'Hybrid',
  // Add other types as needed
}

export enum AlertSeverity {
  High = 'high',
  Medium = 'medium',
  Critical = 'critical',
  Low = 'low',
}

export enum AccessLevel {
  ReadOnly = 'READONLY',
  ReadWrite = 'READWRITE',
  // Add other levels as needed
}

export interface TripCard {
  id: string
  title: string
  description: string
  dates: string[]
  createdAt: Timestamp
  configurations: ChipItem[]
}
