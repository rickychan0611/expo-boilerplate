import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShopProduct } from "../../interfaces/shopInterface";
import { Address, CurrentPosition, UserInfo } from '../../interfaces/userInterface'

interface UserState {
  userInfo: UserInfo | undefined,
  isLogin: boolean,
  resetPhone: string,
  resetToken: string,
  currentPosition?: CurrentPosition,
  addresses: Address[]
  myProducts: ShopProduct[],
  pendingProducts: ShopProduct[],
  editProduct: ShopProduct | undefined,
  colorScheme: string | null | undefined,
  searchedAddress: any,
  applyShop: any,
  applyCodeStatus: number,
  openLoginDialog: boolean,
  originRoute: any,
  messages: any,
  unreadMsgNum: number,
  couponCode: string
}

const initialState: UserState = {
  userInfo: undefined,
  isLogin: false,
  resetPhone: "",
  resetToken: "",
  currentPosition: undefined,
  addresses: [],
  myProducts: [],
  pendingProducts: [],
  editProduct: undefined,
  // colorScheme: Appearance.getColorScheme(),
  colorScheme: "light",
  searchedAddress: {},
  applyShop: {},
  applyCodeStatus: 0,
  openLoginDialog: false,
  originRoute: "",
  messages: undefined,
  unreadMsgNum: 0,
  couponCode: ""
}

export const userInfoSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initUser: (state: UserState, action: PayloadAction<any>) => {
      state.userInfo = action.payload
    },
    resetUserSlice: () => initialState,
    setIsLogin: (state: UserState, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload
    },
    setResetPhone: (state: UserState, action: PayloadAction<string>) => {
      state.resetPhone = action.payload
    },
    setResetToken: (state: UserState, action: PayloadAction<string>) => {
      state.resetToken = action.payload
    },
    setCurrentPosition: (state: UserState, action: PayloadAction<any>) => {
      state.currentPosition = action.payload
    },
    setAddresses: (state: UserState, action: PayloadAction<any>) => {
      state.addresses = action.payload
    },
    setMyProducts: (state: UserState, action: PayloadAction<ShopProduct[]>) => {
      state.myProducts = action.payload
    },
    setPendingProducts: (state: UserState, action: PayloadAction<ShopProduct[]>) => {
      state.pendingProducts = action.payload
    },
    setEditProduct: (state: UserState, action: PayloadAction<ShopProduct | undefined>) => {
      state.editProduct = action.payload
    },
    setColorScheme: (state: UserState, action: PayloadAction<string | null | undefined>) => {
      // colorScheme takes "dark" or "light"
      state.colorScheme = action.payload
    },
    setSearchedAddress: (state: UserState, action: PayloadAction<any>) => {
      state.searchedAddress = action.payload
    },
    setApplyShop: (state: UserState, action: PayloadAction<any>) => {
      state.applyShop = action.payload
    },
    setApplyCodeStatus: (state: UserState, action: PayloadAction<any>) => {
      state.applyCodeStatus = action.payload
    },
    setOpenLoginDialog: (state: UserState, action: PayloadAction<any>) => {
      state.openLoginDialog = action.payload
    },
    setOriginRoute: (state: UserState, action: PayloadAction<any>) => {
      state.originRoute = action.payload
    },
    setMessages: (state: UserState, action: PayloadAction<any>) => {
      state.messages = action.payload
    },
    setUnreadMsgNum: (state: UserState, action: PayloadAction<any>) => {
      state.unreadMsgNum = action.payload
    },
    setCouponCode: (state: UserState, action: PayloadAction<any>) => {
      state.couponCode = action.payload
    }
  }
})

export const {
  initUser,
  setCouponCode,
  setMessages,
  setUnreadMsgNum,
  resetUserSlice,
  setIsLogin,
  setResetToken,
  setResetPhone,
  setCurrentPosition,
  setAddresses,
  setMyProducts,
  setPendingProducts,
  setEditProduct,
  setColorScheme,
  setSearchedAddress,
  setApplyShop,
  setApplyCodeStatus,
  setOpenLoginDialog,
  setOriginRoute
} = userInfoSlice.actions

export default userInfoSlice.reducer