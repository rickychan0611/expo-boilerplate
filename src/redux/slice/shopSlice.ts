import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Categories, Category, PayAmount, ShippingFee, Shop, ShopProduct } from "../../interfaces/shopInterface";
import { Address } from "../../interfaces/userInterface";
import { CreditCard, SavedCard, ShopOrderDetails, Spec, Tips, AllVariants } from '../../interfaces/orderInterface';
interface AddItemPayload {
  item: ShopProduct,
  shopIndex: number,
  shop: Shop | undefined
}

interface CartState {
  addignItem: boolean,
  attributeTotal: number,
  shopOrderItems: any,
  shopIndex: number,
  currentCheckoutOrder: any,
  updateItem: ShopProduct | undefined,
  favStore: Shop | undefined,
  currentShop: Shop | undefined,
  shippingFee: ShippingFee | undefined,
  payAmount: PayAmount | undefined,
  shippingAddress: Address | undefined,
  orderDetails: ShopOrderDetails | undefined,
  tips: Tips | undefined,
  paymentMethod: any,
  paymentPending: boolean,
  creditCardInfo: CreditCard
  savedCards?: SavedCard[],
  selectedCard: SavedCard | undefined,
  products: ShopProduct[],
  categories: Categories | undefined
  category: Category | undefined,
  requestCounter: any,
  allVariants: AllVariants,
  selectedVariants: string[],
  skuData: Spec[],
  stockErr: any,
  inventory_setting: number,
  newStock: any
}

const initialState: CartState = {
  addignItem: false,
  attributeTotal: 0,
  shopOrderItems: [],
  shopIndex: -1,
  currentCheckoutOrder: undefined,
  updateItem: undefined,
  favStore: undefined,
  currentShop: undefined,
  shippingFee: undefined,
  payAmount: undefined,
  shippingAddress: undefined,
  orderDetails: undefined,
  tips: undefined,
  paymentMethod: undefined,
  paymentPending: false,
  savedCards: [],
  selectedCard: undefined,
  creditCardInfo: {
    order_id: "",
    card_number: "",
    expiry_year: 0,
    expiry_month: 0,
    cardholder_name: "",
    cvd: 0,
    ticket_id: 0,
    if_save: false,
    if_saved: false,
    card_street_name: "",
    card_street_number: 0,
    card_postcode: "",
    card_custom_name: "",
    saved_card_id: "",
    is_channel_order: 1,
    
  },
  products: [],
  categories: undefined,
  category: undefined,
  requestCounter: undefined,
  allVariants: {},
  skuData: [],
  selectedVariants: [],
  stockErr: {},
  inventory_setting: 0,
  newStock: {}
}

export const shopSlice = createSlice({
  name: 'shopCart',
  initialState,
  reducers: {
    resetRestaurantSlice: () => initialState,
    addItemToCart: (state: CartState, action: PayloadAction<AddItemPayload>) => {
      const newItem: any = action.payload.item
      const shop: Shop | undefined = action.payload.shop
      const shopIndex: number = action.payload.shopIndex
      const existingShop: any = state.shopOrderItems[shopIndex]
      const itemIndex: number = existingShop?.items?.findIndex((item: any) => item.id === newItem?.id);
      if (shopIndex === -1) {
        state.shopOrderItems.unshift({
          shop,
          items: [
            { ...newItem, quantity: 1 }
          ]
        })
      }
      else {
        if (itemIndex === -1) {
          state.shopOrderItems?.[shopIndex]?.items?.push({ ...newItem, quantity: 1 })
        }
        else {
          state.shopOrderItems[shopIndex].items[itemIndex].quantity++
        }
      }
    },
    removeItemFromCart: (state: CartState, action: PayloadAction<AddItemPayload>) => {
      const newItem: any = action.payload.item
      const shopIndex: number = action.payload.shopIndex
      const existingShop: any = state.shopOrderItems[shopIndex]
      const itemIndex: number = existingShop?.items?.findIndex((item: any) => item.id === newItem?.id);
      const quantity: number = existingShop?.items?.[itemIndex].quantity
      state.shopOrderItems[shopIndex].items[itemIndex].quantity--
      if (quantity === 1) {
        state.shopOrderItems?.[shopIndex].items.splice(itemIndex, 1)
      }
      if (state.shopOrderItems?.[shopIndex].items.length === 0) {
        state.shopOrderItems?.splice(shopIndex, 1)
      }
    },
    addingItem: (state: CartState, action: PayloadAction<boolean>) => {
      state.addignItem = action.payload
    },
    setShopOrderItems: (state: CartState, action: PayloadAction<any>) => {
      state.shopOrderItems = action.payload
    },
    setCurrentCheckoutOrder: (state: CartState, action: PayloadAction<any>) => {
      state.currentCheckoutOrder = action.payload
    },
    setAttributeTotal: (state: CartState, action: PayloadAction<number>) => {
      state.attributeTotal = action.payload
    },
    setUpdateItem: (state: CartState, action: PayloadAction<ShopProduct>) => {
      state.updateItem = action.payload
    },
    setFavStore: (state: CartState, action: PayloadAction<Shop>) => {
      state.favStore = action.payload
    },
    setCurrentShop: (state: CartState, action: PayloadAction<Shop | undefined>) => {
      state.currentShop = action.payload
    },
    setShippingFee: (state: CartState, action: PayloadAction<ShippingFee | undefined>) => {
      state.shippingFee = action.payload
    },
    setPayAmount: (state: CartState, action: PayloadAction<PayAmount | undefined>) => {
      state.payAmount = action.payload
    },
    setShippingAddress: (state: CartState, action: PayloadAction<Address | undefined>) => {
      state.shippingAddress = action.payload
    },
    setTips: (state: CartState, action: PayloadAction<any | undefined>) => {
      state.tips = action.payload
    },
    setPaymentMethod: (state: CartState, action: PayloadAction<any | undefined>) => {
      state.paymentMethod = action.payload
    },
    setPaymentPending: (state: CartState, action: PayloadAction<boolean>) => {
      state.paymentPending = action.payload
    },
    setCreditCardInfo: (state: CartState, action: PayloadAction<CreditCard>) => {
      state.creditCardInfo = action.payload
    },
    setSavedCards: (state: CartState, action: PayloadAction<SavedCard[]>) => {
      state.savedCards = action.payload
    },
    setSelectedCard: (state: CartState, action: PayloadAction<SavedCard | undefined>) => {
      state.selectedCard = action.payload
    },
    setProducts: (state: CartState, action: PayloadAction<ShopProduct[]>) => {
      state.products = action.payload
    },
    setCategories: (state: CartState, action: PayloadAction<Categories>) => {
      state.categories = action.payload
    },
    setCategory: (state: CartState, action: PayloadAction<Category | undefined>) => {
      state.category = action.payload
    },
    setRequestCounter: (state: CartState, action: PayloadAction<number>) => {
      state.requestCounter = action.payload
    },
    setSkuData: (state: CartState, action: PayloadAction<Spec[]>) => {
      state.skuData = action.payload
    },
    setAllVariants: (state: CartState, action: PayloadAction<AllVariants>) => {
      state.allVariants = action.payload
    },
    setSelectedVariants: (state: CartState, action: PayloadAction<string[]>) => {
      state.selectedVariants = action.payload
    },
    setInventory_setting: (state: CartState, action: PayloadAction<number>) => {
      state.inventory_setting = action.payload
    },
    setStockErr: (state: CartState, action: PayloadAction<any>) => {
      state.stockErr = action.payload
    },
    setNewStock: (state: CartState, action: PayloadAction<any>) => {
      state.newStock = action.payload
    },
  }
})

export const {
  resetRestaurantSlice,
  addingItem,
  removeItemFromCart,
  addItemToCart,
  setShopOrderItems,
  setAttributeTotal,
  setCurrentCheckoutOrder,
  setUpdateItem,
  setFavStore,
  setCurrentShop,
  setShippingFee,
  setPayAmount,
  setShippingAddress,
  setTips,
  setPaymentMethod,
  setPaymentPending,
  setCreditCardInfo,
  setSavedCards,
  setSelectedCard,
  setProducts,
  setCategories,
  setCategory,
  setRequestCounter,
  setAllVariants,
  setSelectedVariants,
  setSkuData,
  setStockErr,
  setInventory_setting,
  setNewStock
} = shopSlice.actions

export default shopSlice.reducer