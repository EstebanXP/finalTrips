import { createSlice } from '@reduxjs/toolkit'

export interface dongleState {
  access: string
  callName: string
  data_usage: number
  display: string
  docker_releases: []
  ethereum_address: string
  geofences: []
  hw_board_ver: string
  hw_modem: string
  hw_revision: string
  icc: string
  id: string
  imei: string
  is_blocked_by_release: boolean
  is_update_enqueued: boolean
  is_updated: boolean
  key_state: string
  last_communication: string
  max_data_usage: number
  open_alerts: {
    high: number
    medium: number
    critical: number
    low: number
  }
  owner: number
  pending_sync_count: number
  phone_number: string
  release: {
    version: string
    active: boolean
  }
  secure_element_serial_number: string
  tags: null | any
  template: null | any
  token: string
  unit_id: string
  user_metadata: {}
  vehicle: {
    id: number
    vin: string
    display: string
    callName: string
    licensePlate: string
    battery_nominal_voltage: number
    make: number
    model: number
    type: string
    year: number
  }
  warnings: []
  wifi_pass: string
}

const initialState = {
  dongles: [] as dongleState[],
}

const dongleSlice = createSlice({
  name: 'dongle',
  initialState,
  reducers: {
    setDongles: (state, action) => {
      state.dongles = action.payload
    },
  },
})

const { actions } = dongleSlice

export { actions }

export default dongleSlice.reducer
