import React, { useEffect } from 'react'
import { View, ScrollView } from "react-native"

//styling
import tw from "twrnc"
import CartXIcon from '@/assets/bootstrip_icons/cart-x.svg'

//libraries
import { useTranslation } from 'react-i18next';

//redux
import { useAppSelector } from '@/src/redux/hooks'

//components
import CartShopHeader from '@/src/components/UI/CartShopHeader'
import CartItem from '@/src/components/UI/CartItem'
import CartCheckoutBar from '@/src/components/UI/CartCheckoutBar'
import { ShopProduct } from '@/src/interfaces/shopInterface'
import { H4, R14 } from '@/src/components/Elements/FontStyles';
import { colors } from '@/src/constants/colors';

const CheckoutMedthod = ({ shopProducts, index, note }: { shopProducts: ShopProduct[], index: any, note: string }) => {
  return (
    <View style={tw`flex-nowrap shadow-md rounded-lg bg-white p-3 mb-3`}
      key={index + "shop"}>
      <CartShopHeader shopProducts={shopProducts} />
      <View style={tw`flex-1 mt-2`}>
        {shopProducts.map((item: any, i: number) => {
          return (
            <CartItem
              key={i}
              item={item.item}
              chosenSpecs={item.chosenSpecs}
              index={index}
              order={shopProducts[i]}
            />
          )
        })}
      </View>
      <CartCheckoutBar shopProducts={shopProducts} note={note} />
    </View>
  )
}

const Cart = () => {

  const shopOrderItems = useAppSelector(state => state.shop.shopOrderItems)
  const { t } = useTranslation("shop")

  console.log("shopOrderItems", shopOrderItems)

  return (
    <View style={tw`bg-white flex-1`}>
      <ScrollView style={tw`max-w-5xl px-2`}>
        {!Object.keys(shopOrderItems).length ?
          <View style={tw`flex-1 mt-30 justify-center items-center`}>
            <CartXIcon fill={colors.neutral90} width={120} height={120} />
            <R14 color={colors.neutral70} style={tw`mt-5`}>{t`YOUR_CART_IS_EMPTY`} </R14>
            <R14 color={colors.neutral70}>{t`ADD_ITEMS_TO_GET_STARTED`}</R14>
          </View>
          :
          <View style={tw`flex-col flex-nowrap p-2`}>
            {Object.values(shopOrderItems)?.map((orderItemsValues: any, index: number) => {
              const shopProducts: ShopProduct[] = Object.values(orderItemsValues)
              console.log("shopProducts", shopProducts)
              const services = shopProducts.filter((item: ShopProduct) => item.item?.need_shipping === 0)
              const pickups = shopProducts.filter((item: ShopProduct) => item.item?.need_shipping === 1 && item.item.pickup_or_delivery === 1)
              const deliveries = shopProducts.filter((item: ShopProduct) => item.item?.need_shipping === 1 && item.item.pickup_or_delivery === 2)
              return (
                <View style={tw``} key={index}>
                  <CheckoutMedthod shopProducts={shopProducts} index={index} note="Delivery only" />
                  {/* {!!deliveries?.length && <CheckoutMedthod shopProducts={deliveries} index={index} note={t('Delivery only')} />}
                  {!!pickups?.length && <CheckoutMedthod shopProducts={pickups} index={index} note={t('Pickup only')} />} */}
                  {/* {!!services?.length && <CheckoutMedthod shopProducts={services} index={index} note={t('Service digital product')} />} */}
                </View>
              )
            })}
          </View>
        }
        <View style={tw`h-[200px]`} />
      </ScrollView>
      {/* cart button */}
    </View>
  )
}

export default Cart