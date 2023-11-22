import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

//libraries
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

// data
import axios from 'axios';

// interfaces
import { shopAPI } from '../../api/shopAPI';
import { OrderItem, Shop, ShopProduct } from '../../interfaces/shopInterface';

//redux
import { useAppDispatch } from '../../redux/hooks'
import { setCurrentCheckoutOrder } from '../../redux/slice/shopSlice';

//styling
import tw from "twrnc"
import { H6, R12 } from '../Elements/FontStyles';
import { colors } from '@/src/constants/colors';
// import useCheckLoginAndRedirect from '@/src/hooks/useCheckLoginAndRedirect';

type Props = {
  shopProducts?: ShopProduct[],
  note: string
}

const CartCheckoutBar: React.FC<Props> = ({ shopProducts, note }) => {
  const dispatch = useAppDispatch()
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadedShop, setLoadedShop] = useState<Shop>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const navigation = useNavigation<any>()
  const { t } = useTranslation("shop")
  const route = useRoute()
  // const isLoggedIn = useCheckLoginAndRedirect(route)

  const convertItemData = () => {
    let items: any = [];
    shopProducts?.forEach((obj: any) => {
      let id = obj.item.id;
      let chosenSpecs = obj.chosenSpecs;

      if (obj.has_attributes == 1) {
        Object.keys(chosenSpecs)?.forEach(key => {
          let specObj = chosenSpecs[key];
          let spec_id = specObj?.spec_infos?.spec_id;
          let quantity = specObj?.quantity;
          let price = +specObj?.spec_infos?.price
          items.push({ id, spec_id, quantity, price });
        });
      }
      else {
        items.push({ id, quantity: obj.quantity })
      }
    });
    return items
  }

  const getPayAmount = async () => {
    try {
      setLoading(true)
      const data = {
        shop_id: shopProducts?.[0]?.shop?.id,
        items: convertItemData(),
      }
      const getPayAmount = await shopAPI.getPayAmount(data);
      let str = "Sorry, not enough stock. Please change the quantity.\n"
      if (getPayAmount.code === 200) {
        return "enough stock"
      }
      if (getPayAmount.response.data.message) {
        throw (getPayAmount.response.data.message)
      }
      else if (getPayAmount.response.data.code === 400) {
        let noStockItems: any = []
        getPayAmount.response.data.data.out_of_stock_items.forEach((item: any) => {
          if (item.has_attributes === 1) {
            let spec_en = item.spec.spec_infos.product_specs_en.replace(/["{}]/g, '').replace(/,/g, '\n').replace(/:/g, ': ');
            let spec_cn = item.spec.spec_infos.product_specs_cn.replace(/["{}]/g, '').replace(/,/g, '\n').replace(/:/g, ': ');
            noStockItems.push({
              name: item.name_en,
              available_stock: item.spec.spec_infos.available_stock || "Out of Stock",
              spec: spec_en
            })
          }
          else {
            noStockItems.push({
              name: item.name_en,
              available_stock: item.available_stock || "Out of Stock",
              spec: ""
            })
          }
        })
        noStockItems.forEach((item: any) => {
          str = str + "Item: " + item.name + "\n" + (!!item.spec ? item.spec + "\n" : "") + "Available stock: " + item.available_stock + "\n\n"
        })
        alert(str)
      }
      else {
        throw (getPayAmount.message || getPayAmount.response.data.message)
      }
    }
    catch (err) {
      console.warn(err)
      alert(err)
    }
    finally {
      setLoading(false)
    }
  }

  // useEffect(() => {
  //   (async () => {
  //     if (loadedShop) {

  //       if (loadedShop?.now_open_status === 0) {
  //         setIsOpen(false)
  //         return
  //       }
  //       else {
  //         setIsOpen(true)
  //         return
  //       }
  //     }
  //   })()
  // }, [loadedShop])

  const [total, setTotal] = useState(0)

  const getSpecTotal = () => {
    let specTotal = 0
    const chosen = shopProducts?.filter((item: any) => {
      return item.has_attributes === 1
    })
    chosen?.forEach((item: any) => {
      const obj = Object.values(item.chosenSpecs)
      obj.forEach((x: any) => {
        specTotal = specTotal + x.spec_infos.price * x.quantity
      })
    })
    return specTotal
  }

  const getTotal = () => {
    let specTotal = 0
    let noSpecTotal = 0

    // calucate total with spec
    const specs = convertItemData()
    specs[0] && specs.forEach((spec: any) => {
      if (spec?.spec_id) {
        specTotal = specTotal + (spec.price * spec.quantity)
      }
    })

    // calucate total without spec
    shopProducts?.forEach((item: any, i: number) => {
      if (item.has_attributes === 0) {
        noSpecTotal = noSpecTotal + (item.quantity * +item.item.price)
      }
    })

    setTotal(noSpecTotal + specTotal)
  }

  const onCheckout = async () => {
    try {
      const res = await getPayAmount()
      if (res === "enough stock") {
        dispatch(setCurrentCheckoutOrder(shopProducts))
        navigation.navigate("EcommerceRouter", { screen: "ShopCheckout" })
      }
    }
    catch {
      console.warn("Get amount error")
    }
  }

  useEffect(() => {
    getTotal()
    return () => setTotal(0)
  }, [shopProducts])

  return (
    <View style={tw`flex flex-row flex-nowrap justify-between items-center py-2`}>

      <View style={tw`flex-col`}>
        <H6 color={colors.neutral10}>
          Total:
          <H6 style={tw`text-[${colors.primary50}]`}>
            {" $" + total.toFixed(2)}
          </H6>
        </H6>
        <R12 color={colors.neutral60} style={tw`mt-2`}>{note}</R12>
      </View>

      <TouchableOpacity style={tw`bg-[${colors.primary40}] rounded-md py-2 min-w-30 flex-row justify-center`}
        disabled={loading}
        onPress={async () => {
          // if (isLoggedIn()) {
            onCheckout()
          // }
        }}
      >
        {loading ?
          <View style={tw`justify-center items-center`}>
             <ActivityIndicator color={"white"} hidesWhenStopped={!loading} />
          </View>
          :
          <H6 style={tw`text-white`}>
            {t`CHECKOUT`}
          </H6>}
      </TouchableOpacity>
    </View>
  )
}

export default CartCheckoutBar