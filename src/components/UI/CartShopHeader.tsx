import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Image, Alert } from "react-native"
import Logo from '@/assets/icon-P-grey.png'
//styling
import tw from "twrnc"

//libraries
import LeftChervon from '@/assets/bootstrip_icons/chevron-right.svg'
import TrashIcon from '@/assets/bootstrip_icons/trash3.svg'
import { useNavigation, useTheme } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'

//redux
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setShopOrderItems } from '../../redux/slice/shopSlice';
import { ShopProduct } from '../../interfaces/shopInterface';
import { HOST_URL } from '@/env'
import { colors } from '@/src/constants/colors'
import { H7, M14 } from '../Elements/FontStyles'

type Props = {
  shopProducts: ShopProduct[],
}

const CartShopHeader: React.FC<Props> = ({ shopProducts }) => {
  const navigation = useNavigation<any>()
  const [shopImageUrl, setShopImageUrl] = useState<string>("")
  const shopOrderItems = useAppSelector(state => state.shop.shopOrderItems)
  const dispatch = useAppDispatch()
  const [shop, setShop] = useState<any>({})
  const { t, i18n } = useTranslation("shop")

  const handleRemoveShop = (): void => {
    let temp = JSON.parse(JSON.stringify(shopOrderItems))
    shopProducts.forEach((_, i) => {
      delete temp[shop.id][shopProducts[i].item.id]
    })
    if (!Object.keys(temp[shop.id])[0]) {
      delete temp[shop.id]
    }
    dispatch(setShopOrderItems(temp))
  }

  const onRemove = () => {
    Alert.alert(
      'Delete all items',
      'Remove all items from your cart?',
      [
        { text: 'Cancel', onPress: () => { } },
        {
          text: 'OK', onPress: () => {
            handleRemoveShop()
          }
        },
      ]
    );
  };

  const getShopImageUrl = (): void => {
    if (shop?.logo) {
      setShopImageUrl(JSON.parse(shop.logo) ? HOST_URL + '/storage/' + JSON.parse(shop.logo) : "")
    }
  }

  useEffect(() => {
    getShopImageUrl()
    setShop(shopProducts[0].shop)
  }, [shopOrderItems])

  return (
    <View style={tw`flex-1 flex-row flex-nowrap justify-between items-center mb-2`}>
      <View style={tw`flex-1 flex-row flex-nowrap justify-between items-center pr-8`}>
        <Image style={tw`rounded-full w-[32px] h-[32px] mr-3`}
          source={shopImageUrl ? { uri: shopImageUrl } : Logo}
          resizeMode='cover'
        />
        <TouchableOpacity style={tw`flex-1 flex-row items-center`}
          onPress={() => navigation.push("ShopPage", { shop_id: shop?.id })}>
          <M14 numberOfLines={1} style={tw`mr-1`}>
            {i18n.language === "cn" ? (shop.name_cn || shop.name_en) : shop.name_en}
          </M14>
          <LeftChervon fill={colors.neutral30} width={13} height={13} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={tw`flex-row items-center`}
        onPress={onRemove}>
        <H7 color={colors.error} style={tw`mr-1`}>{t`Delete All`}</H7>
        <TrashIcon fill={colors.error} height={12} width={12} />
      </TouchableOpacity>

    </View>
  )
}

export default CartShopHeader