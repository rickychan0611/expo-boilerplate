import { UserInfo } from "@/src/interfaces/userInterface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  userInfo: UserInfo | undefined,
}

const initialState: UserState = {
  userInfo: undefined,
}

export const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state: UserState, action: PayloadAction<any>) => {
      state.userInfo = action.payload
    },
   
  }
})

export const {
  setUserInfo,
} = userInfoSlice.actions

export default userInfoSlice.reducer