import { configureStore } from '@reduxjs/toolkit'
import shopSlice from './slice/shopSlice'
import userSlice from './slice/userSlice'
import userAuthSlice from './slice/userAuthSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    shop: shopSlice,
    userAuth: userAuthSlice
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production',
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch