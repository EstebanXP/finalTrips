import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import userSlice from './UserReducer'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import topbarSlice from './TopBarReducer'
import dongleSlice from './DongleReducer'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  user: userSlice,
  topbar: topbarSlice,
  dongle: dongleSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(thunk),
})

setupListeners(store.dispatch)

export default store

export type GlobalState = ReturnType<typeof store.getState>
