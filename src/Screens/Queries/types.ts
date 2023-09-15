export interface Trip {
  device: string
  distanceKm: number
  duration: string
  end_position_display: {}
  end_position_lat: number | null
  end_position_lng: number | null
  end_time_utc: string
  id: string
  start_position_display: {}
  start_position_lat: number | null
  start_position_lng: number | null
  start_time_utc: string
  tag: string
}
