import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { setShopOrderItems } from '@/src/redux/slice/shopSlice'
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Icon_DashLg, Icon_Dash_Circle, Icon_PlusCircle, Icon_PlusLg } from '../Elements/Icons';
import tw from 'twrnc';
import PressableOpacity from '../Elements/PressableOpacity';
import { colors } from '@/src/constants/colors';
import { HOST_URL } from '@/env';
import NumKeyboard from './NumKeyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShopProductCard = ({ product }: any) => {

  const { t, i18n } = useTranslation();
  const [qty, setQty] = useState(0);
  const shopOrderItems = useAppSelector(state => state.shop.shopOrderItems)
  const dispatch = useAppDispatch()
  const [openKeyboard, setOpenKeyboard] = useState<boolean>(false)

  const addItem = async (plusOrMinus: number, quantity: number) => {
    const shopId: any = product?.shop.id
    const itemId: any = product?.id
    let newOrder: any = {
      [shopId]: {
        [itemId]: {
          item: product,
          has_attributes: 0,
          quantity: 1,
          shop: product?.shop,
          chosenSpecs: { quantity: 0 }
        },
      }
    }

    let orderCopy = JSON.parse(JSON.stringify(shopOrderItems))
    //if cart is not empty
    if (Object.keys(shopOrderItems)[0]) {
      // check if shop exists
      const shopKeys = Object.keys(shopOrderItems)
      if (shopKeys.includes(product?.shop.id + "")) {

        const itemKeys: any = Object.keys(shopOrderItems[product?.shop?.id + ""])

        // check if same item exists
        if (itemKeys.includes(product?.id + "")) {

          //remove item or shop if empty
          if (quantity === 0) {
            delete orderCopy[product?.shop?.id + ""][product?.id + ""]
            if (!Object.keys(orderCopy[product?.shop?.id + ""]).length) {
              delete orderCopy[product?.shop?.id + ""]
            }
            dispatch(setShopOrderItems(orderCopy))
            return
          }
          orderCopy[product?.shop?.id + ""][product?.id + ""].quantity = +orderCopy[product?.shop?.id + ""][product?.id + ""].quantity + plusOrMinus
          dispatch(setShopOrderItems(orderCopy))

        }
        //shop found. item not found. add item to the shop
        else {

          orderCopy[product?.shop?.id + ""][product?.id + ""] = newOrder[product?.shop?.id + ""][product?.id + ""]
          dispatch(setShopOrderItems(orderCopy))
        }
      }
      //shop not found. add newOrder
      else {

        orderCopy[product?.shop?.id + ""] = newOrder[product?.shop?.id + ""]
        dispatch(setShopOrderItems(orderCopy))
      }
    }
    else {
      //shop not found. add newOrder

      dispatch(setShopOrderItems(newOrder))
    }

    await AsyncStorage.setItem("createdShopOrder", JSON.stringify(""))

  };

  useEffect(() => {
    setQty(shopOrderItems?.[product.shop.id]?.[product?.id || 0]?.quantity || 0)
  }, [])

  return (
    <>
      <NumKeyboard
        open={openKeyboard}
        setOpen={setOpenKeyboard}
        setQty={setQty}
        qty={qty}
      />

      <PressableOpacity style={tw`w-full h-[70px] flex flex-row items-center rounded bg-white mb-2 p-2`}
        onPress={() => router.push("/shop/product/" + product.id)}>

        {product?.images && <Image source={{ uri: HOST_URL + '/storage/' + JSON.parse((product?.images || " ") + "")[0] }}
          style={tw`w-[60px] h-[60px]`}
          resizeMode="cover"
        />}

        <View style={tw`flex-1`}>
          <Text style={tw`font-bold px-2`} numberOfLines={1}>
            {i18n.language === "cn" ? product.name_cn : product.name_en}
          </Text>
          <View style={tw`flex-1 flex-row ml-2`}>
            <View style={tw`flex-1`}>
              <Text style={tw`leading-5 text-stone-500`} numberOfLines={1}>
                Unit: 1lbs
              </Text>
              <Text style={tw`text-slate-800`}>
                ${product.price ? product.price : product.price_range}
              </Text>
            </View>
            <View style={tw`w-[80px] flex-row justify-end items-center gap-2 mt-4`}>
              {qty > 0 ?
                <>
                  <PressableOpacity style={tw`flex justify-center items-center p-1 bg-[${colors.primary}] rounded-full`}
                    hitSlop={5}
                    onPress={async () => {
                      if (qty > 0) {
                        setQty(qty - 1)
                        addItem(-1, qty - 1)
                      }
                    }}>
                    <Icon_DashLg fill="white" width={10} height={10} />
                  </PressableOpacity>

                  <PressableOpacity style={tw`justify-center items-center border rounded border-gray-400 min-w-[50px] p-0.5`}
                    hitSlop={5}
                    onPress={() => setOpenKeyboard(true)}>
                    <Text style={tw``}>
                      {qty}
                    </Text>
                  </PressableOpacity>
                </>
                : <></>
              }
              <PressableOpacity style={tw`flex justify-center items-center p-1 bg-[${colors.primary}] rounded-full`}
                hitSlop={5}
                onPress={async () => {
                  setQty(qty + 1)
                  addItem(1, qty + 1)
                }}>
                <Icon_PlusLg fill="white" width={10} height={10} />
              </PressableOpacity>
            </View>
          </View>
        </View>

      </PressableOpacity>
    </>
  )
}

export default ShopProductCard