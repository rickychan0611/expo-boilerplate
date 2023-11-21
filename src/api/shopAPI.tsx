import { GET, POST } from './apiCalls'
type RouterQueryType = string | string[] | undefined

export const shopAPI = {
  getNestedcategories: async () => {
    return await GET("/api/channel/partner/nestedcategories", undefined)
  },
  /** Fetch partner's product*/
  getCustomerShopProducts: async (shop_id: RouterQueryType, category_id: string) => {
    return await GET("/api/channel/shop/shopproductse", { shop_id, category_id })
  },
  /** Fetch partner's product*/
  getPartnerShopProducts: async (shop_id: RouterQueryType, category_id: string) => {
    return await GET("/api/channel/partner/shopproductse", { shop_id, category_id })
  },
  /** Fetch pending product*/
  getPendingProducts: async (shop_id: RouterQueryType) => {
    return await GET("/api/channel/partner/productrequest/check", { shop_id })
  },
  /** Search Shop by keyword*/
  searchKeyword: async (keyword: RouterQueryType) => {
    return await GET("/api/channel/shop/search", { keyword, pagesize: 100, page: 1 })
  },
  /** Fetch orders depends on status*/
  getOrders: async (
    finish_status: number,
    pagesize: number | undefined,
    page: number | undefined
  ) => {
    return await GET("/api/shop/user/orders", { finish_status, pagesize, page })
  },
  // /** Fetch a single product*/
  getSingleProduct: async (product_id: RouterQueryType) => {
    return await GET("/api/channel/shop/singleproduct", { product_id })
  },
  // /** Create a new order*/
  createOrder: async (body: any) => {
    return await POST("/api/channel/order/create", body)
  },
  // /** Get Pay Amount*/
  getPayAmount: async (body: any) => {
    return await POST("/api/channel/order/payamount", body)
  },
  // /** Fetch user saved credit card*/
  getSavedCards: async () => {
    return await GET("/api/res/order/savedcards", undefined)
  },
  // /** Fetch all shop categories and 12 of their products*/
  getAllCats: async () => {
    return await GET("/api/channel/shop/catesproducts", undefined)
  },
  // /** Fetch category Products*/
  getCatProducts: async (category_id: RouterQueryType, pagesize: number, page: number, min_price: number, max_price: number | string, orderby: string | undefined) => {
    return await GET("/api/channel/shop/cateproducts", { category_id, pagesize, page, min_price, max_price, orderby })
  },
  // /** Tell the server what is the payment method and get a redirect url*/
  payOrderSnap: async (body: any) => {
    return await POST("/api/res/pay/payordersnap", body)
  },
  // /** Fetch Payment Result*/
  payResultSnap: async (body: any) => {
    return await POST("/api/res/pay/payresultsnap", body)
  },
  // /** Post a Moneris credit card payment*/
  postCreditCardPayment: async (body: any) => {
    return await POST("/api/res/pay/paymoneriscardv", body)
  },
  // /** Fetch nearby restaurants */
  // nearby: async (latitude: number, longitude: number, radius: number) => {
  //   return await GET("/api/res/shops/nearby", { latitude, longitude, radius })
  // },
  // /** Fetch featured restaurants */
  // featured: async () => {
  //   return await GET("/api/res/shops/featured", undefined)
  // },
  // /** Fetch restaurant categories*/
  getshoptype: async () => {
    return await GET("/api/res/getshoptype", undefined)
  },
  // /** Fetch user saved addresses*/
  getUserAddress: async () => {
    return await GET("/api/res/user/address", undefined)
  },
  // /** Fetch a restaurant's full memu*/
  getShopProducts: async (shop_id: RouterQueryType, category_id: string) => {
    return await GET("/api/res/shopproductse", { shop_id, category_id })
  },
  // /** Fetch a single shop*/
  getSingleShop: async (shop_id: RouterQueryType) => {
    return await GET("/api/res/singleshop", { shop_id })
  },
  // /** Fetch shipping price*/
  getShippingPrice: async (latitude: number | string, longitude: number | string, shop_id: number | string) => {
    return await GET("/api/res/order/shippingprice", { latitude, longitude, shop_id })
  },
  // /** Search by keyword*/
  searchByKeyword: async (keyword: string) => {
    return await GET("/api/res/search", { keyword })
  },
  // /** Fetch a single order by id*/
  getOrderById: async (order_id: RouterQueryType) => {
    return await GET("/api/res/user/order", { order_id })
  },
  // /** Fetch driver info*/
  getDriverInfo: async (order_id: RouterQueryType) => {
    return await GET("/api/res/order/driverinfo", { order_id })
  },
  // /** Post a driver's review*/
  createDriverReview: async (body: any) => {
    return await POST("/api/res/user/driverreview/create", body)
  },
  // /** Post a order's review*/
  createOrderReview: async (body: any) => {
    return await POST("/api/res/user/orderreview/create", body)
  },
  // /** Post a channel order's review*/
  createChannelOrderReview: async (body: any) => {
    return await POST("/api/channel/order/review/create", body)
  },
}

