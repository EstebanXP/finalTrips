import { createSlice } from '@reduxjs/toolkit'
import { TripData } from '../Utils/Types'

interface tripsState {
  trips: TripData[] | null
}

const initialState: tripsState = {
  trips: null,
}

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {
    setTrips: (state, action) => {
      state.trips = action.payload
    },
  },
})

const { actions } = tripsSlice

export { actions }

export default tripsSlice.reducer
