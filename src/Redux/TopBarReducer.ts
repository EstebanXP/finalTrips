import { createSlice } from '@reduxjs/toolkit'
import { TopBarStructure } from '../Utils/Types'

interface TopBarState {
  route: TopBarStructure | null
  isNavbarOpen: boolean
}

const initialState: TopBarState = {
  route: null,
  isNavbarOpen: false,
}

const topbarSlice = createSlice({
  name: 'topbar',
  initialState,
  reducers: {
    openNavbar: (state) => {
      state.isNavbarOpen = true
    },
    closeNavbar: (state) => {
      state.isNavbarOpen = false
    },
    setRoute: (state, action) => {
      state.isNavbarOpen = action.payload
    },
  },
})

const { actions } = topbarSlice

export { actions }

export default topbarSlice.reducer
