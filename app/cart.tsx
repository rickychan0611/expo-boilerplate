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
import ShopProductCard from '@/src/components/UI/ShopProductCard';

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
            {Object.values(shopOrderItems)?.map((shopOrderItem: any, index: number) => {
              const product: ShopProduct[] = shopOrderItem.item
              return (
                <View style={tw``} key={index}>
                  <ShopProductCard product={product}/>
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