import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState: {
    signInCount: 0,
    signUpCount: 0,
    resetCount: 0,
    nextAllowedTime: null,
    lastSignInPhone: null,
    lastSignUpAccount: null,
    lastResetAccount: null,
  },
  reducers: {
    incrementSignInCount: (state) => {
      state.signInCount = state.signInCount + 1
    },

    incrementSignUpCount: (state) => {
      state.signUpCount = state.signUpCount + 1
    },

    incrementResetCount: (state) => {
      state.resetCount = state.resetCount + 1
    },

    setNextAllowedTime: (state, action) => {
      state.nextAllowedTime = action.payload
    },

    setLastSignInPhone: (state, action) => {
      state.lastSignInPhone = action.payload
    },

    setLastSignUpAccount: (state, action) => {
      state.lastSignUpAccount = action.payload
    },

    setLastResetAccount: (state, action) => {
      state.lastResetAccount = action.payload
    }
  }
})

export const {
  incrementSignInCount,
  incrementSignUpCount,
  incrementResetCount,
  setNextAllowedTime,
  setLastSignInPhone,
  setLastSignUpAccount,
  setLastResetAccount
} = userAuthSlice.actions

export default userAuthSlice.reducer