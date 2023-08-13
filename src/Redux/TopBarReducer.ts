import { createSlice } from '@reduxjs/toolkit'

interface TopBarState {
  route: string
  isNavbarOpen: boolean
}

const initialState: TopBarState = {
  route: '',
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
      state.route = action.payload
    },
  },
})

const { actions } = topbarSlice

export { actions }

export default topbarSlice.reducer
