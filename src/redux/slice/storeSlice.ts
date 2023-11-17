import { UserInfo } from "@/src/interfaces/userInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: UserInfo | undefined,
}

const initialState: UserState = {
  userInfo: undefined,
}

export const storeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setOrder: (state: UserState, action: PayloadAction<any>) => {
      state.userInfo = action.payload
    },
  }
})

export const {
  setOrder,
} = storeSlice.actions

export default storeSlice.reducer