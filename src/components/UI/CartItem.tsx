import React, { useEffect, useState, useCallback } from 'react'
import { View, TouchableOpacity, Image } from "react-native"

//libraries
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

//styling
import tw from "twrnc"
import Logo from '@/assets/icon-P-grey.png'

//redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setShopOrderItems } from '@/src/redux/slice/shopSlice';
import { ChosenSpecs, ShopProduct } from '@/src/interfaces/orderInterface';
import { HOST_URL } from '@/env';
import QtyButtonsAndPrice from './QtyButtonsAndPrice';
import { H6, M12 } from '../Elements/FontStyles';
import { colors } from '@/src/constants/colors';

type Props = {
  order: any,
  index: number,
  item: ShopProduct,
  chosenSpecs: ChosenSpecs
}

const CartItem: React.FC<Props> = ({ order, index, item, chosenSpecs }) => {
  const navigation = useNavigation<any>()
  const { t } = useTranslation("shop")
  const shopOrderItems = useAppSelector(state => state.shop.shopOrderItems)
  const dispatch = useAppDispatch()
  const [total, setTotal] = useState<number>(0);
  const [itemImageUrl, setItemImageUrl] = useState<string>("")

  const handleRemove = async (item: any, key: string): Promise<void> => {
    let temp = JSON.parse(JSON.stringify(shopOrderItems))
    const itemsKeys = Object.keys(temp[item.shop.id])
    const chosenSpecsKeys = Object.keys(temp[item.shop.id][item.id]?.chosenSpecs)
    // if has_attributes
    if (item.has_attributes === 1) {
      //if specs is last item, but shop contains more items, delete specs
      if (chosenSpecsKeys.length === 1 &&
        itemsKeys.length > 1) {
        delete temp[item.shop.id][item.id]
      }
      //if specs is last item and but shop contains no items, delete shop
      else if (chosenSpecsKeys.length === 1 &&
        itemsKeys.length === 1) {
        delete temp[item.shop.id]
      }
      //if not last item, delete the item
      else {
        delete temp[item.shop.id][item.id].chosenSpecs[key]
      }
      dispatch(setShopOrderItems(temp))
    }

    // if no attributes
    else {
      //if last item, delete shop
      if (Object.keys(temp[item.shop.id]).length === 1) {
        delete temp[item.shop.id]
      }
      //if not last item, delete the item
      else {
        delete temp[item.shop.id][item.id]
      }
      dispatch(setShopOrderItems(temp))
    }
  }

  const getItemImageUrl =
    useCallback((): void => {
      if (item?.images?.length) {
        setItemImageUrl(HOST_URL + '/storage/' + JSON.parse(item.images + "")[0])
      }
      else {
        setItemImageUrl("")
      }
    }, [item])

  const getTotal =
    useCallback(() => {
      setTotal(((item.promotion_price ? +item.promotion_price : +(item?.price || 0)) + (item?.attributeTotal || 0)) * +(order?.quantity || 0))
    }, [item])

  useEffect(() => {
    getItemImageUrl()
    getTotal()
  }, [shopOrderItems])

  return (
    <View style={tw`flex-1 flex-row flex-nowrap justify-between mb-4`}>
      {item.has_attributes === 1 &&
        <View style={tw`flex-1 flex-row justify-between flex-nowrap mt-2`}>
          <View style={tw`flex-1 flex-col`}>
            {Object.values(chosenSpecs).map((opt: any, i: number) => {
              let en = opt.spec_infos?.product_specs_en?.replace(/["{}]/g, '').replace(/,/g, '\n').replace(/:/g, ': ');
              let cn = opt.spec_infos?.product_specs_cn?.replace(/["{}]/g, '').replace(/,/g, '\n').replace(/:/g, ': ');
              return (
                <View key={i} style={tw`flex-1 flex-row justify-between mb-5`}>
                  <View style={tw`flex-row flex-1`}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("EcommerceRouter", { screen: "SingleProduct", params: { productId: item.id } })
                      }}>
                      <Image style={tw`w-[56px] h-[56px] rounded mr-2`}
                        source={itemImageUrl ? { uri: itemImageUrl } : Logo}
                        resizeMode='cover'
                      />
                    </TouchableOpacity>
                    {/* name and spec */}
                    <View style={tw`flex-1 flex-col justify-start`}>
                      <H6 numberOfLines={2} style={tw`leading-6 mt-[-4px]`}>
                        {t('name', { en: item.name_en, cn: item.name_cn })}
                      </H6>

                      {(opt?.quantity && opt?.quantity > 0) ?
                        <M12 color={colors.neutral60}
                          style={tw`leading-5 mb-1`}
                          key={"opt" + i}>
                          {t('name', { en, cn })}
                        </M12>
                        : null
                      }
                    </View>
                  </View>

                  <View style={tw`ml-4`}>
                    {/* price and qty */}
                    <QtyButtonsAndPrice
                      qty={opt.quantity}
                      price={opt.spec_infos?.price}
                      spec={Object.keys(chosenSpecs)[i]}
                      item={item}
                      handleRemove={handleRemove}
                    />
                  </View>
                </View>

              )
            })}
          </View>
        </View>
      }

      {
        item.has_attributes === 0 &&
        <View style={tw`flex flex-1 flex-row flex-nowrap mt-2`}>
          <TouchableOpacity
            style={tw`flex flex-row flex-1`}
            onPress={() => {
              navigation.push("SingleProduct", { productId: item.id })
            }}>
            <Image style={tw`w-[56px] h-[56px] rounded mr-2`}
              source={itemImageUrl ? { uri: itemImageUrl } : Logo}
              resizeMode='cover'
            />
            {/* name */}
            <View style={tw`flex-1 flex-col`}>
              <H6 numberOfLines={2} style={tw`flex flex-1 leading-6`}>
                {t('name', { en: item.name_en, cn: item.name_cn })}
              </H6>
            </View>
          </TouchableOpacity>

          <View style={tw`ml-4`}>
            {/* price and qty */}
            <QtyButtonsAndPrice
              qty={order?.quantity}
              price={+item.price}
              item={item}
              handleRemove={handleRemove}
            />

          </View>
        </View>
      }
    </View >
  )
}

export default CartItem