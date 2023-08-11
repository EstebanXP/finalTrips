import { createSlice } from '@reduxjs/toolkit'
import { UserDataStructure } from '../Utils/Types'

interface UserState {
  user: UserDataStructure | null
  isAuthenticated: boolean
  token: string
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  token: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.user
      state.isAuthenticated = action.payload.isAuthenticated
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = ''
    },
  },
})

const { actions } = userSlice

export { actions }

export default userSlice.reducer
