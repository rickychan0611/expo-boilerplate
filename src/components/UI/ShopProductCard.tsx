import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { setShopOrderItems } from '@/src/redux/slice/shopSlice'
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { Icon_DashLg, Icon_PlusLg } from '../Elements/Icons';
import tw from 'twrnc';
import PressableOpacity from '../Elements/PressableOpacity';
import { colors } from '@/src/constants/colors';
import { HOST_URL } from '@/env';
import NumKeyboard from './NumKeyboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductModal from './ProductModal';

const ShopProductCard = ({ product }: any) => {

  const { t, i18n } = useTranslation();
  const [qty, setQty] = useState(product.quantity || 0);
  const shopOrderItems = useAppSelector(state => state.shop.shopOrderItems)
  const dispatch = useAppDispatch()
  const [openKeyboard, setOpenKeyboard] = useState<boolean>(false)
  const [openProduct, setOpenProduct] = useState<boolean>(false)

  const handleItems = (plusOrMinus: number, quantity: number) => {
    const itemId: any = product?.id
    let newItem: any = {
      [itemId]: {
        item: product,
        quantity: 1,
        shop: product?.shop,
      },
    }

    let shopOrderItemsCopy = JSON.parse(JSON.stringify(shopOrderItems))
    //if cart is not empty
    if (Object.keys(shopOrderItemsCopy)[0]) {

      // check if item exists in the cart
      const itemKeys = Object.keys(shopOrderItemsCopy)

      // Check if same item exists. 
      // if items exists in cart:
      if (itemKeys?.[0]) {
        // if same item exists in cart:
        if (itemKeys.includes(product?.id + "")) {
          //remove item or shop if empty
          if (quantity === 0) {
            delete shopOrderItemsCopy[product?.id + ""]
            setQty(0)
            return shopOrderItemsCopy
          }
          // quanity > 0, update quanity of that item
          shopOrderItemsCopy[product?.id + ""].quantity = +shopOrderItemsCopy[product?.id + ""].quantity + (+plusOrMinus)
          setQty(+shopOrderItemsCopy[product?.id + ""].quantity + (+plusOrMinus))
          return shopOrderItemsCopy
        }
        else {
          // new item not exists, add item to existing cart
          shopOrderItemsCopy = { ...shopOrderItemsCopy, ...newItem }
          return shopOrderItemsCopy
        }
      }
    }
    //cart empty. add item to cart
    else {
      return newItem
    }
  }

  const addItem = async (plusOrMinus: number, quantity: number) => {
    const handledItems = handleItems(plusOrMinus, quantity)
    dispatch(setShopOrderItems(handledItems))
    await AsyncStorage.setItem("shopOrderItems", JSON.stringify(handledItems))
  };

  const keyboardUpdateQty = async (newQty: number) => {
    let shopOrderItemsCopy = JSON.parse(JSON.stringify(shopOrderItems))
    if (!newQty) {
      delete shopOrderItemsCopy[product?.id + ""]
    }
    else {
      shopOrderItemsCopy[product?.id + ""].quantity = newQty
    }
    dispatch(setShopOrderItems(shopOrderItemsCopy))
    await AsyncStorage.setItem("shopOrderItems", JSON.stringify(shopOrderItemsCopy))
  }

  const memoizedQty = useMemo(() => {
    return shopOrderItems?.[product?.id || 0]?.quantity || 0;
  }, [shopOrderItems, product]);

  useEffect(() => {
    setQty(memoizedQty);
  }, [memoizedQty]);

  return (
    <>
      <NumKeyboard
        open={openKeyboard}
        setOpen={setOpenKeyboard}
        qty={qty}
        keyboardUpdateQty={keyboardUpdateQty}
      />

      <ProductModal
        item={product}
        open={openProduct}
        setOpen={setOpenProduct}
      />

      <PressableOpacity style={tw`w-full  flex flex-row items-center rounded bg-white mb-2 p-2`}
        onPress={() => setOpenProduct(true)} >

        {product?.images && <Image source={{ uri: HOST_URL + '/storage/' + JSON.parse((product?.images || " ") + "")[0] }}
          style={tw`w-[70px] h-[70px] rounded`}
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

      </PressableOpacity >
    </>
  )
}

export default ShopProductCard