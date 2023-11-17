import { configureStore } from '@reduxjs/toolkit'
import shopSlice from './slice/storeSlice'
import userSlice from './slice/userSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    store: shopSlice,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch