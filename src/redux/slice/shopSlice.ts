import { UserInfo } from "@/src/interfaces/userInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: UserInfo | undefined,
  orderItems: any,
}

const initialState: UserState = {
  userInfo: undefined,
  orderItems: {},
}

export const storeSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setOrder: (state: UserState, action: PayloadAction<any>) => {
      state.userInfo = action.payload
    },
    setOrderItems: (state: UserState, action: PayloadAction<any>) => {
      state.orderItems = action.payload
    },
  }
})

export const {
  setOrder,
  setOrderItems
} = storeSlice.actions

export default storeSlice.reducer