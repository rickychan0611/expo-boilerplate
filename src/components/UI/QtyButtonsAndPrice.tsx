import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, Alert } from "react-native"

//styling
import tw from "twrnc"
// icons
import PlusIcon from '@/assets/bootstrip_icons/plus-lg.svg'
import MinusIcon from '@/assets/bootstrip_icons/dash-lg.svg'
import RemoveIcon from '@/assets/bootstrip_icons/trash3.svg'

//redux
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks'
import { setShopOrderItems } from '@/src/redux/slice/shopSlice';
import useDebounce from '@/src/hooks/useDebounce';
import { H6 } from '../Elements/FontStyles'
import { colors } from '@/src/constants/colors'

type Props = {
  qty: number,
  price: number,
  item: any,
  spec?: string,
  handleRemove?: any
}

const QtyButtonsAndPrice = ({ qty, item, spec, price, handleRemove }: Props) => {
  const shopOrderItems = useAppSelector(state => state.shop.shopOrderItems)
  const dispatch = useAppDispatch()
  const [newQty, setNewQty] = useState<number>(qty)
  const debouncedValue = useDebounce(newQty, 300)
  const [openRemoveModal, setOpenRemoveModal] = useState<boolean>(false)

  const add = () => {
    setNewQty(prev => prev + 1)
  }
  const minus = () => {
    if (newQty > 1) {
      setNewQty(prev => prev - 1)
    }
  }

  const updateOrderItems = () => {
    let temp = JSON.parse(JSON.stringify(shopOrderItems))
    if (spec) {
      temp[item.shop_id][item.id].chosenSpecs[spec].quantity = newQty
    }
    else {
      temp[item.shop_id][item.id].quantity = newQty
    }
    dispatch(setShopOrderItems(temp))
  }

  // triggered when counter is updated when pressing add to cart button  
  useEffect(() => {
    updateOrderItems()
  }, [debouncedValue])

  const onRemove = () => {
    Alert.alert(
      'Delete item',
      'Remove this item from your cart?',
      [
        { text: 'Cancel', onPress: () => setOpenRemoveModal(false) },
        {
          text: 'OK', onPress: () => {
            setOpenRemoveModal(false)
            handleRemove(item, spec || "")
          }
        },
      ]
    );
  };

  return (<>

    {/* <Modal isOpen={openRemoveModal} onClose={() => setOpenRemoveModal(false)}>
      <Modal.Content>
        <View style={tw`w-[74%] bg-white rounded justify-center items-center p-4`}>
          <H4 style={tw`my-4`}>Delete item</H4>
          <R16 color={colors.neutral40}>Remove this item from your cart?</R16>
          <View style={tw`w-full flex-row justify-between mt-8 mb-2`}>
            <View style={tw`flex-1 mr-1`}>
              <Button
                label='Cancel'
                outline
                color={colors.primary}
                onPress={() => {
                  setOpenRemoveModal(false)
                }}
              />
            </View>
            <View style={tw`flex-1 ml-1`}>
              <Button
                label='Confirm'
                color={colors.primary}
                onPress={() => {
                  setOpenRemoveModal(false)
                  handleRemove(item, spec || "")
                }}
              />
            </View>
          </View>
        </View>
      </Modal.Content>
    </Modal> */}

    <View style={tw`flex-1 flex-col justify-between items-end`}>
      <H6>${(price * newQty).toFixed(2)}</H6>
    </View>
    <View style={tw.style(`flex-row justify-between items-center border border-[${colors.neutral60}] py-2 px-3 my-2 rounded`)}>
      {newQty > 1 ? <TouchableOpacity onPress={minus}>
        <MinusIcon height={16} width={16} fill={colors.neutral60} />
      </TouchableOpacity>
        :
        <TouchableOpacity onPress={onRemove}>
          <RemoveIcon height={16} width={16} fill={colors.neutral60} />
        </TouchableOpacity>}
      <H6 color={colors.neutral40} style={tw.style(`px-[16px]`)}>
        {newQty}
      </H6>
      <TouchableOpacity onPress={add}>
        <PlusIcon height={16} width={16} fill={colors.neutral60} />
      </TouchableOpacity>
    </View>
  </>
  )
}

export default QtyButtonsAndPrice